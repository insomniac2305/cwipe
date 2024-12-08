import { mockMovieMatch } from "@/app/match/[id]/lib/__mocks__/actions";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import useMatches from "@/app/match/[id]/lib/useMatches";
import { MatchList } from "@/app/match/[id]/components/MatchList";

vi.mock("@/app/match/[id]/lib/useMatches");
vi.mock("@/app/match/[id]/components/MatchListItem");

const mockMovieMatches = [
  mockMovieMatch(new Date(), 1, "One"),
  mockMovieMatch(new Date(), 2, "Two"),
  mockMovieMatch(new Date(), 3, "Three"),
];

describe("Match List", () => {
  it("Renders correct number of match items", async () => {
    vi.mocked(useMatches).mockReturnValueOnce({
      matches: mockMovieMatches,
      newMatches: [],
      mutateMatches: vi.fn(),
      error: undefined,
    });

    render(<MatchList matchSessionId="1" />);

    const actualListItems = screen.getAllByTestId("match-list-item");
    expect(actualListItems.length).toEqual(mockMovieMatches.length);
  });

  it("Renders info when no matches were returned", async () => {
    vi.mocked(useMatches).mockReturnValueOnce({
      matches: [],
      newMatches: [],
      mutateMatches: vi.fn(),
      error: undefined,
    });

    render(<MatchList matchSessionId="1" />);

    const emptyListInfo = screen.getByText(/no matches/i);
    expect(emptyListInfo).toBeInTheDocument();
  });

  it("Renders error when fetching of matches failed", async () => {
    vi.mocked(useMatches).mockReturnValueOnce({
      matches: undefined,
      newMatches: [],
      mutateMatches: vi.fn(),
      error: { message: "error" },
    });

    render(<MatchList matchSessionId="1" />);

    const error = screen.getByText(/error/i);
    expect(error).toBeInTheDocument();
  });
});
