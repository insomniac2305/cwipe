import { vi } from "vitest";
import { DiscoverMovies } from "@/app/lib/definitions";

export const getTopMovies = vi.fn();

export const mockDiscoverMovie = (
  title = "",
  posterPath = "",
): DiscoverMovies["results"][0] => ({
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  id: 1,
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: posterPath,
  release_date: "",
  title: title,
  video: false,
  vote_average: 0,
  vote_count: 0,
});
