import "@/app/__mocks__/intersectionObserver";
import "@/app/__mocks__/Image";
import "@/app/__mocks__/FallbackImages";
import { DynamicMoviePosters } from "@/app/DynamicMoviePosters";
import { DiscoverMovies } from "@/app/lib/definitions";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockDiscoverMovie = (
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

describe("Dynamic Movie Posters", () => {
  it("displays images posters of first three movies passed as prop", () => {
    const mockMovies = [
      mockDiscoverMovie("1", "1.jpg"),
      mockDiscoverMovie("2", "2.jpg"),
      mockDiscoverMovie("3", "3.jpg"),
    ];
    const mockPosterPaths = mockMovies.map(
      (mockMovie) =>
        `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${mockMovie.poster_path}`,
    );

    render(<DynamicMoviePosters movies={mockMovies} />);

    const posters = screen.getAllByRole("img");
    const actualPosterPaths = posters.map((poster) =>
      poster.getAttribute("src"),
    );

    expect(actualPosterPaths).toEqual(mockPosterPaths);
  });

  it("displays three fallback images when movies prop undefined", () => {
    render(<DynamicMoviePosters />);

    const posters = screen.getAllByRole("img");

    const arePosterPathsFallback = posters.map((poster) =>
      poster.getAttribute("src")?.includes("fallback"),
    );

    expect(arePosterPathsFallback).toEqual([true, true, true]);
  });
});
