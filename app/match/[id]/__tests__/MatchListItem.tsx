import "@/app/__mocks__/Image";
import { mockMovieMatch } from "@/app/match/[id]/lib/__mocks__/actions";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MatchListItem } from "@/app/match/[id]/components/MatchListItem";

const mockMovie = mockMovieMatch(new Date(), 1, "One");

describe("Match List Item", () => {
  it("Renders movie title", async () => {
    render(<MatchListItem movie={mockMovie} />);

    const movieTitle = screen.getByRole("heading", { name: mockMovie.title });
    expect(movieTitle).toBeInTheDocument();
  });

  it("Renders link to movie watch providers", async () => {
    render(<MatchListItem movie={mockMovie} />);

    const movieTitle = screen.getByRole("link", { name: mockMovie.title });
    expect(movieTitle.getAttribute("href")).toEqual(
      mockMovie.watch_providers?.link,
    );
  });
});
