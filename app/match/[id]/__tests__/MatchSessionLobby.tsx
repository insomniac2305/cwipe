import MatchSessionLobby from "@/app/match/[id]/components/MatchSessionLobby";
import { startMatchSession } from "@/app/match/[id]/lib/actions";
import { useMatchSession } from "@/app/match/[id]/lib/useMatchSession";
import { mockMatchSession } from "@/app/match/lib/__mocks__/actions";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/components/User");
vi.mock("@/app/match/components/MatchLayout");
vi.mock("@/app/match/[id]/lib/actions");
vi.mock("@/app/match/[id]/lib/useMatchSession");
vi.stubGlobal("location", { reload: vi.fn() });

const mockCurrentUser = { id: "1", name: "One" };

const mockUsers = [
  { ...mockCurrentUser, is_host: true },
  { id: "2", name: "Two" },
  { id: "3", name: "Three" },
];
const mockNewSession = mockMatchSession("1", [], [], mockUsers, false);
const mockStartedSession = mockMatchSession("1", [], [], mockUsers, true);

describe("Match Session Lobby", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mocked(useMatchSession).mockReturnValue({
    matchSession: mockNewSession,
    error: undefined,
  });

  it("renders correct number of users", () => {
    render(
      <MatchSessionLobby
        matchSession={mockNewSession}
        session={{ user: mockCurrentUser, expires: "" }}
      />,
    );

    const actualUserNames = screen
      .getAllByTestId("user")
      .map((user) => user.textContent);
    const mockUserNames = mockUsers.map((user) => user.name);

    expect(actualUserNames).toEqual(mockUserNames);
  });

  it("renders host user with visible badge", () => {
    render(
      <MatchSessionLobby
        matchSession={mockNewSession}
        session={{ user: mockCurrentUser, expires: "" }}
      />,
    );

    const hostBadges = screen.getAllByLabelText(/is host/i);
    const visibleHostBadges = hostBadges.filter(
      (badge) => badge.dataset["invisible"] === "false",
    );
    const hostUserName = visibleHostBadges[0].previousSibling?.textContent;

    expect(hostUserName).toEqual(mockCurrentUser.name);
  });

  it("starts match session when button is pressed", async () => {
    render(
      <MatchSessionLobby
        matchSession={mockNewSession}
        session={{ user: mockCurrentUser, expires: "" }}
      />,
    );

    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);

    await waitFor(() => expect(startMatchSession).toHaveBeenCalled());
  });

  it("reloads page after successfully starting match session", async () => {
    vi.mocked(startMatchSession).mockResolvedValueOnce(undefined);

    render(
      <MatchSessionLobby
        matchSession={mockNewSession}
        session={{ user: mockCurrentUser, expires: "" }}
      />,
    );

    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);

    await waitFor(() => expect(location.reload).toHaveBeenCalled());
  });

  it("reloads page when match session is started", () => {
    vi.mocked(useMatchSession).mockReturnValue({
      matchSession: mockStartedSession,
      error: undefined,
    });

    render(
      <MatchSessionLobby
        matchSession={mockStartedSession}
        session={{ user: mockCurrentUser, expires: "" }}
      />,
    );

    expect(location.reload).toHaveBeenCalled();
  });
});

describe("Match Session Lobby (error)", () => {
  it("renders error when fetching of match session data failed", () => {
    vi.mocked(useMatchSession).mockReturnValueOnce({
      matchSession: undefined,
      error: "error",
    });

    render(
      <MatchSessionLobby
        matchSession={mockNewSession}
        session={{ user: mockCurrentUser, expires: "" }}
      />,
    );

    const error = screen.getByText(/error/i);

    expect(error).toBeInTheDocument();
  });

  it("renders error when starting of match session failed", async () => {
    vi.mocked(useMatchSession).mockReturnValueOnce({
      matchSession: mockNewSession,
      error: undefined,
    });
    vi.mocked(startMatchSession).mockResolvedValueOnce({
      error: { message: "error" },
    });

    render(
      <MatchSessionLobby
        matchSession={mockNewSession}
        session={{ user: mockCurrentUser, expires: "" }}
      />,
    );

    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    const error = await screen.findByText(/error/i);

    expect(error).toBeInTheDocument();
  });
});
