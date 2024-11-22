"use server";

import { DiscoverMovies, GetResult } from "@/app/lib/definitions";
import { fetchOptions } from "@/app/lib/tmdbConfiguration";

export async function getTopMovies(): GetResult<DiscoverMovies["results"]> {
  try {
    const searchParams = composeTopMovieSearchParams();

    const topMovieResponse = await fetch(
      `${process.env.TMDB_API_URL}discover/movie?${searchParams.toString()}`,
      fetchOptions,
    );
    const topMovies: DiscoverMovies = await topMovieResponse.json();

    return { data: topMovies.results };
  } catch (error) {
    return { error: { message: "Error loading top movies" } };
  }
}

function composeTopMovieSearchParams() {
  const searchParams = new URLSearchParams();
  searchParams.append("include_adult", "false");
  searchParams.append("include_video", "false");
  searchParams.append("language", "en-US");
  searchParams.append("watch_region", "DE");
  searchParams.append("sort_by", "popularity.desc");
  searchParams.append("page", "1");
  searchParams.append("vote_average.gte", "8");
  searchParams.append("vote_count.gte", "1000");
  return searchParams;
}
