import "@/app/__mocks__/Image";
import { mockSwipe } from "@/app/match/[id]/components/__mocks__/SwipeCard";
import MovieCard from "@/app/match/[id]/components/MovieCard";
import { mockMovie } from "@/app/match/[id]/lib/__mocks__/actions";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/match/[id]/components/SwipeCard");

const mockedMovie = mockMovie(1, "One");
const mockOnRateMovie = vi.fn();

describe("Movie Card", () => {
  beforeEach(() => {
    mockSwipe.mockClear();
  });

  it("renders movie title", () => {
    render(
      <MovieCard
        movie={mockedMovie}
        zIndex={0}
        isLiked={undefined}
        isInfoVisible
        onRateMovie={mockOnRateMovie}
      />,
    );

    const movieTitle = screen.getByRole("heading", { name: mockedMovie.title });
    expect(movieTitle).toBeInTheDocument();
  });

  it("calls swipe right action when movie rating changes to true", () => {
    const { rerender } = render(
      <MovieCard
        movie={mockedMovie}
        zIndex={0}
        isLiked={undefined}
        isInfoVisible
        onRateMovie={mockOnRateMovie}
      />,
    );

    rerender(
      <MovieCard
        movie={mockedMovie}
        zIndex={0}
        isLiked={true}
        isInfoVisible
        onRateMovie={mockOnRateMovie}
      />,
    );

    expect(mockSwipe).toHaveBeenCalledWith("right", false);
  });

  it("calls swipe left action when movie rating changes to false", () => {
    const { rerender } = render(
      <MovieCard
        movie={mockedMovie}
        zIndex={0}
        isLiked={undefined}
        isInfoVisible
        onRateMovie={mockOnRateMovie}
      />,
    );

    rerender(
      <MovieCard
        movie={mockedMovie}
        zIndex={0}
        isLiked={false}
        isInfoVisible
        onRateMovie={mockOnRateMovie}
      />,
    );

    expect(mockSwipe).toHaveBeenCalledWith("left", false);
  });
});
