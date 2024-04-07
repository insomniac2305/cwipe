"use server";

import { MatchSession } from "@/app/lib/definitions";
import { DiscoverMovies, Movie, MovieDetails } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { composePostgresArray } from "@/app/lib/util";
import { auth } from "@/app/lib/auth";

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TMDB_API_TOKEN,
  },
  next: { revalidate: 3600 },
};

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
) {
  await sql`
      INSERT INTO match_sessions_users(user_id, match_session_id)
      VALUES (${userId}, ${matchSessionId})`;
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

export async function getMovies() {
  const response = await fetch(
    process.env.TMDB_API_URL +
      "discover/movie?include_adult=false&include_video=false&language=de-DE&page=1&sort_by=popularity.desc",
    fetchOptions,
  );
  const discoveredMovies: DiscoverMovies = await response.json();

  const movies: Array<Movie> = await Promise.all(
    discoveredMovies.results.map(async (movie) => {
      const detailResponse = await fetch(
        process.env.TMDB_API_URL +
          `movie/${movie.id}?append_to_response=credits%2Cwatch%2Fproviders&language=de-DE`,
        fetchOptions,
      );
      const movieData: MovieDetails = await detailResponse.json();
      return {
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        genres: movieData.genres,
        watch_providers: movieData["watch/providers"].results["DE"],
        vote_average: movieData.vote_average,
        release_date: movieData.release_date,
        runtime: movieData.runtime,
        overview: movieData.overview,
        cast: movieData.credits.cast,
      };
    }),
  );

  return movies;
}

export async function rateMovie(id: number, isLiked: boolean) {
  const session = await auth();
  const userId = session?.user?.id;

  await sql`
      INSERT INTO users_movies(user_id, movie_id, is_liked)
      VALUES(${userId}, ${id}, ${isLiked})`;
}

export async function undoMovieRating(id: number) {
  const session = await auth();
  const userId = session?.user?.id;

  await sql`
      DELETE FROM users_movies
      WHERE user_id = ${userId} AND movie_id = ${id}`;
}
