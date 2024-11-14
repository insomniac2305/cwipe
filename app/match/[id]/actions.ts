"use server";

import { GetResult, MatchSession, MovieMatch } from "@/app/lib/definitions";
import { DiscoverMovies, Movie, MovieDetails } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/app/lib/auth";
import { TMDB_PAGE_LIMIT, fetchOptions } from "@/app/lib/tmdbConfiguration";

export async function getMatchSession(id: string): GetResult<MatchSession> {
  noStore();
  let isNotFound = false;
  try {
    const matchSessionData = await sql`
      SELECT ms.id, msp.providers, msp.genres, ms.is_started, COUNT(msm.movie_id) as match_count
      FROM match_sessions ms
      LEFT JOIN match_session_matches msm
      ON ms.id = msm.match_session_id
      LEFT JOIN match_session_preferences msp
      ON ms.id = msp.match_session_id
      WHERE ms.id = ${id}
      GROUP BY ms.id, msp.providers, msp.genres, ms.is_started`;

    if (matchSessionData.rowCount && matchSessionData.rowCount < 1) {
      isNotFound = true;
      notFound();
    }

    const userData = await sql`
      SELECT u.id, msu.is_host, u.name, u.image
      FROM match_sessions_users msu
      INNER JOIN users u
      ON msu.user_id = u.id
      WHERE msu.match_session_id = ${id}`;

    const matchSession = {
      id: matchSessionData.rows[0].id,
      providers: matchSessionData.rows[0].providers,
      genres: matchSessionData.rows[0].genres,
      users: userData.rows,
      is_started: matchSessionData.rows[0].is_started,
      match_count: matchSessionData.rows[0].match_count,
    };

    return { data: matchSession };
  } catch (error) {
    if (isNotFound) throw error;
    return { error: { message: "Error loading match session" } };
  }
}

export async function addUserToMatchSession(
  matchSessionId: string,
  isHost?: boolean,
) {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) throw new Error();
    await sql`
        INSERT INTO match_sessions_users(user_id, match_session_id, is_host)
        VALUES (${userId}, ${matchSessionId}, ${!!isHost})`;
  } catch (error) {
    return { error: { message: "Error adding user to session" } };
  }
}

export async function startMatchSession(id: string) {
  const session = await auth();
  let isUserHost = false;
  try {
    const userHostData = await sql`
        SELECT is_host
        FROM match_sessions_users
        WHERE match_session_id = ${id} AND user_id = ${session?.user?.id}`;

    isUserHost = userHostData.rows[0].is_host;
    if (!isUserHost) throw new Error();

    await sql`
      UPDATE match_sessions
      SET is_started = true
      WHERE id = ${id}`;
  } catch (error) {
    return {
      error: {
        message: isUserHost
          ? "Error starting match session"
          : "Only the host can start the match session",
      },
    };
  }
}

export async function getMovies(
  matchSessionId: string,
  page: number,
): GetResult<Movie[]> {
  if (page > TMDB_PAGE_LIMIT)
    return { error: { message: "Reached TMDB page limit" } };

  let isNotFound = false;

  try {
    const matchSessionPreferenceData = await sql`
        SELECT providers, genres, region
        FROM match_session_preferences
        WHERE match_session_id = ${matchSessionId}`;

    if (
      matchSessionPreferenceData.rowCount &&
      matchSessionPreferenceData.rowCount < 1
    ) {
      isNotFound = true;
      notFound();
    }

    const session = await auth();
    const userId = session?.user?.id;
    const userLanguageData = await sql`
        SELECT language
        FROM user_preferences
        WHERE user_id = ${userId}`;

    const { providers, genres, region } = matchSessionPreferenceData.rows[0];
    const { language } = userLanguageData.rows[0];

    const searchParams = composeDiscoverSearchParams({
      language,
      region,
      page,
      providers,
      genres,
    });

    const discoverMovieResponse = await fetch(
      `${process.env.TMDB_API_URL}discover/movie?${searchParams.toString()}`,
      fetchOptions,
    );
    const discoveredMovies: DiscoverMovies = await discoverMovieResponse.json();

    const userMoviesData = await sql`
        SELECT user_id, movie_id, is_liked
        FROM users_movies
        WHERE user_id = ${userId}`;

    const userMovieIds = userMoviesData.rows.map(
      (userMovie) => userMovie.movie_id,
    );
    const unratedMovies = discoveredMovies.results.filter(
      (movie) => !userMovieIds.includes(movie.id),
    );
    const unratedMovieIds = unratedMovies.map((movie) => movie.id);

    const movies: Movie[] = await getMovieDetails(
      unratedMovieIds,
      language,
      region,
    );

    return { data: movies };
  } catch (error) {
    if (isNotFound) throw error;
    return { error: { message: "Error loading movies" } };
  }
}

async function getMovieDetails(
  movieIds: number[],
  language: string,
  region: string,
): Promise<Movie[]> {
  //TODO: Add retry for failed fetches due to network errors (ECONNRESET)
  const results = await Promise.allSettled(
    movieIds.map(async (movieId) => {
      const detailSearchParams = composeDetailSearchParams(language);
      const detailResponse = await fetch(
        `${process.env.TMDB_API_URL}movie/${movieId}?${detailSearchParams.toString()}`,
        fetchOptions,
      );
      const movieData: MovieDetails = await detailResponse.json();
      return {
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path,
        genres: movieData.genres,
        watch_providers: movieData["watch/providers"].results[region || "DE"],
        vote_average: movieData.vote_average,
        release_date: movieData.release_date,
        runtime: movieData.runtime,
        overview: movieData.overview,
        cast: movieData.credits.cast,
      };
    }),
  );
  const resolvedMovies = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => (result as PromiseFulfilledResult<Movie>).value);

  return resolvedMovies;
}

export async function rateMovie(id: number, isLiked?: boolean) {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (isLiked === undefined) {
      await sql`
      DELETE FROM users_movies
      WHERE user_id = ${userId} AND movie_id = ${id}`;
    } else {
      const ratedAt = new Date().toISOString();

      await sql`
      INSERT INTO users_movies(user_id, movie_id, is_liked, rated_at)
      VALUES(${userId}, ${id}, ${isLiked}, ${ratedAt})
      ON CONFLICT (user_id, movie_id)
      DO UPDATE SET is_liked = ${isLiked}, rated_at = ${ratedAt}`;
    }
  } catch (error) {
    return { error: { message: "Error rating movie" } };
  }
}

export async function getMatches(
  matchSessionId: string,
  from?: Date,
): GetResult<MovieMatch[]> {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const userPreferenceData = await sql`
        SELECT language, region
        FROM user_preferences
        WHERE user_id = ${userId}`;

    const { language, region } = userPreferenceData.rows[0];

    const matchesData = await sql`
        SELECT movie_id, last_rated_at
        FROM match_session_matches
        WHERE match_session_id = ${matchSessionId}
        AND last_rated_at > ${from ? from.toISOString() : new Date(0).toISOString()}
        ORDER BY last_rated_at DESC`;

    const matchesMap = new Map(
      matchesData.rows.map((match) => [match.movie_id, match.last_rated_at]),
    );

    const matchedMovieIds = Array.from(matchesMap.keys());

    const matchedMovies: Movie[] = await getMovieDetails(
      matchedMovieIds,
      language,
      region,
    );

    const movieMatches: MovieMatch[] = matchedMovies.map((movie) => ({
      ...movie,
      last_rated_at: matchesMap.get(movie.id),
    }));

    return { data: movieMatches };
  } catch (error) {
    return { error: { message: "Error loading matches" } };
  }
}

function composeDetailSearchParams(language: string) {
  const detailSearchParams = new URLSearchParams();
  detailSearchParams.append("append_to_response", "credits,watch/providers");
  detailSearchParams.append("language", language || "en-US");
  return detailSearchParams;
}

function composeDiscoverSearchParams({
  language,
  region,
  page,
  providers,
  genres,
}: {
  language: string;
  region: string;
  page: number;
  providers: number[];
  genres: number[];
}) {
  const searchParams = new URLSearchParams();
  searchParams.append("include_adult", "false");
  searchParams.append("include_video", "false");
  searchParams.append("language", language || "en-US");
  searchParams.append("watch_region", region || "DE");
  searchParams.append("sort_by", "popularity.desc");
  searchParams.append("page", page.toString());
  searchParams.append("with_watch_providers", providers?.join("|"));
  searchParams.append("with_watch_monetization_types", "flatrate|free|ads");
  searchParams.append("with_genres", genres?.join("|"));
  return searchParams;
}
