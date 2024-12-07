import { MatchSessionList } from "@/app/match/components/MatchSessionList";
import { mockMatchSession } from "@/app/match/lib/__mocks__/actions";
import { getMatchSessions } from "@/app/match/lib/actions";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/match/lib/actions");
vi.mock("@/app/match/components/MatchSessionListItem");

const mockMatchSessions = [
  mockMatchSession("1"),
  mockMatchSession("2"),
  mockMatchSession("3"),
];

describe("Match Session List", () => {
  it("Renders correct number of match session items", async () => {
    vi.mocked(getMatchSessions).mockResolvedValueOnce({
      data: mockMatchSessions,
    });

    const page = await MatchSessionList();
    render(page);

    const actualListItems = screen.getAllByTestId("match-session-list-item");
    expect(actualListItems.length).toEqual(mockMatchSessions.length);
  });

  it("Renders info when no match sessions were returned", async () => {
    vi.mocked(getMatchSessions).mockResolvedValueOnce({ data: [] });

    const page = await MatchSessionList();
    render(page);

    const emptyListInfo = screen.getByText(/there are no active sessions/i);
    expect(emptyListInfo).toBeInTheDocument();
  });

  it("Renders error when fetching of match sessions failed", async () => {
    vi.mocked(getMatchSessions).mockResolvedValueOnce({
      error: { message: "error" },
    });

    const page = await MatchSessionList();
    render(page);

    const error = screen.getByText(/error/i);
    expect(error).toBeInTheDocument();
  });
});
