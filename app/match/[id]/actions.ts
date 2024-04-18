"use server";

import { MatchSession } from "@/app/lib/definitions";
import { DiscoverMovies, Movie, MovieDetails } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { notFound, redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { composePostgresArray } from "@/app/lib/util";
import { auth } from "@/app/lib/auth";
import { TMDB_PAGE_LIMIT, fetchOptions } from "@/app/lib/tmdbConfiguration";

export async function getMatchSession(id: string): Promise<MatchSession> {
  noStore();
  const matchSessionData = await sql`
      SELECT id, providers, genres, is_started
      FROM match_sessions
      WHERE id = ${id}`;

  if (matchSessionData.rowCount < 1) notFound();

  const userData = await sql`
      SELECT u.id, msu.is_host, u.name, u.image
      FROM match_sessions_users msu
      INNER JOIN users u
      ON msu.user_id = u.id
      WHERE msu.match_session_id = ${id}`;

  return {
    id: matchSessionData.rows[0].id,
    providers: matchSessionData.rows[0].providers,
    genres: matchSessionData.rows[0].genres,
    users: userData.rows,
    is_started: matchSessionData.rows[0].is_started,
  };
}

export async function addUserToMatchSession(
  matchSessionId: string,
  userId: string,
  isHost?: boolean,
) {
  await sql`
      INSERT INTO match_sessions_users(user_id, match_session_id, is_host)
      VALUES (${userId}, ${matchSessionId}, ${!!isHost})`;
}

export async function startMatchSession(id: string) {
  const session = await auth();

  const userPreferenceData = await sql`
      SELECT u.id, up.providers, up.genres, msu.is_host
      FROM users u
      LEFT JOIN user_preferences up
      ON u.id = up.user_id
      INNER JOIN match_sessions_users msu
      ON u.id = msu.user_id
      WHERE msu.match_session_id = ${id}`;

  const isUserHost = userPreferenceData.rows.find(
    (user) => user.id === session?.user?.id,
  )?.is_host;

  if (!isUserHost) throw new Error("Only the host can start the match session");

  const providersSet = new Set<number>();
  const genresSet = new Set<number>();

  userPreferenceData.rows.forEach((preference) => {
    preference.providers?.forEach((provider: number) => {
      providersSet.add(provider);
    });
    preference.genres?.forEach((genre: number) => {
      genresSet.add(genre);
    });
  });

  const providers = composePostgresArray(Array.from(providersSet));
  const genres = composePostgresArray(Array.from(genresSet));

  await sql`
    UPDATE match_sessions
    SET providers = ${providers}, genres = ${genres}, is_started = true
    WHERE id = ${id}`;
}

export async function getMovies(matchSessionId: string, page: number) {
  if (page > TMDB_PAGE_LIMIT) return []; //No more data due to TMDB page limit

  const matchSessionPreferenceData = await sql`
      SELECT providers, genres
      FROM match_sessions
      WHERE id = ${matchSessionId}`;

  if (matchSessionPreferenceData.rowCount < 1) notFound();

  const session = await auth();
  const userId = session?.user?.id;
  const userPreferenceData = await sql`
      SELECT language, region
      FROM user_preferences
      WHERE user_id = ${userId}`;

  if (userPreferenceData.rowCount < 1) redirect("/onboarding");

  const { providers, genres } = matchSessionPreferenceData.rows[0];
  const { language, region } = userPreferenceData.rows[0];

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

  const movies: Array<Movie> = await getMovieDetails(
    unratedMovieIds,
    language,
    region,
  );

  return movies;
}

async function getMovieDetails(
  movieIds: number[],
  language: string,
  region: string,
): Promise<Movie[]> {
  return await Promise.all(
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
}

export async function rateMovie(id: number, isLiked: boolean) {
  const session = await auth();
  const userId = session?.user?.id;

  const ratedAt = new Date().toISOString();

  await sql`
  INSERT INTO users_movies(user_id, movie_id, is_liked, rated_at)
  VALUES(${userId}, ${id}, ${isLiked}, ${ratedAt})
  ON CONFLICT (user_id, movie_id)
  DO UPDATE SET is_liked = ${isLiked}, rated_at = ${ratedAt}`;
}

export async function undoMovieRating(id: number) {
  const session = await auth();
  const userId = session?.user?.id;

  await sql`
  DELETE FROM users_movies
  WHERE user_id = ${userId} AND movie_id = ${id}`;
}

export async function getMatches(matchSessionId: string, from?: Date) {
  const session = await auth();
  const userId = session?.user?.id;
  const userPreferenceData = await sql`
      SELECT language, region
      FROM user_preferences
      WHERE user_id = ${userId}`;

  const { language, region } = userPreferenceData.rows[0];

  const matchedMovieData = await sql`
      SELECT um.movie_id
      FROM users_movies um
      INNER JOIN match_sessions_users msu
      ON um.user_id = msu.user_id
      WHERE um.is_liked = true 
      AND msu.match_session_id = ${matchSessionId}
      GROUP BY um.movie_id
      HAVING COUNT(um.movie_id) = (
          SELECT COUNT(user_id) 
          FROM match_sessions_users 
          WHERE match_session_id = ${matchSessionId})
      AND MAX(um.rated_at) > ${from ? from.toISOString() : new Date(0).toISOString()}
      ORDER BY MAX(um.rated_at) DESC`;

  const matchedMovieIds = matchedMovieData.rows.map((match) => match.movie_id);

  const matchedMovies: Array<Movie> = await getMovieDetails(
    matchedMovieIds,
    language,
    region,
  );

  return matchedMovies;
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
  searchParams.append("with_genres", genres?.join("|"));
  return searchParams;
}
