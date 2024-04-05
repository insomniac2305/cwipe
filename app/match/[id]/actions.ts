"use server";

import { MatchSession } from "@/app/lib/definitions";
import { DiscoverMovies, Movie, MovieDetails } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { composePostgresArray } from "@/app/lib/util";

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TMDB_API_TOKEN,
  },
  next: { revalidate: 3600 },
};

async function getMatchSessionUserIds(id: string) {
  const sessionUsersData = await sql`
      SELECT user_id
      FROM match_sessions_users
      WHERE match_session_id = ${id}`;

  const sessionUserIds = sessionUsersData.rows.map((row) => row.user_id);
  return sessionUserIds;
}

export async function getMatchSession(id: string): Promise<MatchSession> {
  noStore();
  const matchSessionData = await sql`
      SELECT id, providers, genres, is_started
      FROM match_sessions
      WHERE id = ${id}`;

  if (matchSessionData.rowCount < 1) notFound();

  const sessionUserIds = await getMatchSessionUserIds(id);

  const userData = await sql.query(
    ` SELECT id, name, email, image 
      FROM users 
      WHERE id = ANY($1)`,
    [sessionUserIds],
  );

  return {
    id: matchSessionData.rows[0].id,
    providers: matchSessionData.rows[0].providers,
    genres: matchSessionData.rows[0].genres,
    users: userData.rows,
    isStarted: matchSessionData.rows[0].is_started,
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
  const sessionUserIds = await getMatchSessionUserIds(id);

  const userPreferenceData = await sql.query(
    ` SELECT providers, genres
      FROM user_preferences
      WHERE user_id = ANY($1)`,
    [sessionUserIds],
  );

  const providersSet = new Set<number>();
  const genresSet = new Set<number>();

  userPreferenceData.rows.forEach((preference) => {
    preference.providers.forEach((provider: number) => {
      providersSet.add(provider);
    });
    preference.genres.forEach((genre: number) => {
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
  // To Do
  return { id, isLiked };
}

export async function undoMovieRating(id: number) {
  // To Do
  return { id };
}
