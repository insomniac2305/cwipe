import "@/app/__mocks__/Image";
import MatchModal from "@/app/match/[id]/components/MatchModal";
import { mockMovieMatch } from "@/app/match/[id]/lib/__mocks__/actions";
import { screen, render, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockMovieMatches = [
  mockMovieMatch(new Date(), 1, "One"),
  mockMovieMatch(new Date(), 2, "Two"),
  mockMovieMatch(new Date(), 3, "Three"),
];

const mockOnOpenChange = vi.fn();

describe("Match Modal", () => {
  it("renders all movie titles", () => {
    render(
      <MatchModal
        matches={mockMovieMatches}
        isOpen
        onOpenChange={mockOnOpenChange}
      />,
    );

    const actualMovieTitles = screen
      .getAllByRole("heading", { level: 2 })
      .map((title) => title.textContent);
    const mockMovieTitles = mockMovieMatches.map((movie) => movie.title);

    expect(actualMovieTitles).toEqual(mockMovieTitles);
  });

  it("renders all links to movie watch providers", async () => {
    render(
      <MatchModal
        matches={mockMovieMatches}
        isOpen
        onOpenChange={mockOnOpenChange}
      />,
    );

    const actualMovieLinks = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    const mockMovieLinks = mockMovieMatches.map(
      (movie) => movie.watch_providers?.link,
    );

    expect(actualMovieLinks).toEqual(mockMovieLinks);
  });

  it("renders error when one is passed as prop", () => {
    render(
      <MatchModal
        matches={undefined}
        isOpen
        onOpenChange={mockOnOpenChange}
        error={{ message: "error" }}
      />,
    );

    const error = screen.getByText("error");

    expect(error).toBeInTheDocument();
  });

  it("calls callback function when close button is pressed", () => {
    render(
      <MatchModal
        matches={mockMovieMatches}
        isOpen
        onOpenChange={mockOnOpenChange}
      />,
    );

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalled();
  });
});
