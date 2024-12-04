import "@/app/__mocks__/IntersectionObserver";
import "@/app/__mocks__/Image";
import "@/app/__mocks__/FallbackImages";
import { mockDiscoverMovie } from "@/app/lib/__mocks__/actions";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DynamicMoviePosters } from "@/app/components/DynamicMoviePosters";

const mockMovies = [
  mockDiscoverMovie("1", "1.jpg"),
  mockDiscoverMovie("2", "2.jpg"),
  mockDiscoverMovie("3", "3.jpg"),
];

const mockPosterPaths = mockMovies.map(
  (mockMovie) =>
    `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${mockMovie.poster_path}`,
);

describe("Dynamic Movie Posters", () => {
  it("displays images posters of first three movies passed as prop", () => {
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
