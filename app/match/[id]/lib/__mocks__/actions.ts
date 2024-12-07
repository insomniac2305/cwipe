import { Movie } from "@/app/lib/definitions";
import { vi } from "vitest";

export const getMatchSession = vi.fn();
export const addUserToMatchSession = vi.fn();
export const getMovies = vi.fn();
export const rateMovie = vi.fn();
export const getMatches = vi.fn();

export const mockMovie = (id = 0, title = "", poster_path = ""): Movie => ({
  genres: [],
  id,
  overview: "",
  poster_path,
  backdrop_path: "",
  release_date: "",
  runtime: 0,
  title,
  vote_average: 0,
  watch_providers: { link: "", flatrate: [], rent: [], buy: [] },
  cast: [],
});
