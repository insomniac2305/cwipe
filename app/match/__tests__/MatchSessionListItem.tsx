import { auth } from "@/app/lib/auth";
import { MatchSessionListItem } from "@/app/match/components/MatchSessionListItem";
import { mockMatchSession } from "@/app/match/lib/__mocks__/actions";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/lib/auth");
vi.mock("@heroui/react", async () => {
  const nextUI = await vi.importActual("@heroui/react");
  return {
    ...nextUI,
    Avatar: ({ name }: { name: string }) => (
      <div data-testid="user">{name}</div>
    ),
  };
});

const mockCurrentUser = { id: "1", name: "One" };

const mockUsers = [
  { ...mockCurrentUser, is_host: true },
  { id: "2", name: "Two" },
  { id: "3", name: "Three" },
];

const mockNewSession = mockMatchSession("1", [], [], mockUsers, false);

describe("Match Session List Item", () => {
  beforeEach(() => {
    vi.mocked(auth, { partial: true }).mockResolvedValueOnce({
      user: mockCurrentUser,
    });
  });

  it("renders users passed with prop except current user", async () => {
    const page = await MatchSessionListItem({
      matchSession: mockNewSession,
    });
    render(page);

    const mockUserNames = mockUsers.slice(1).map((user) => user.name);
    const actualUserNames = screen
      .getAllByTestId("user")
      .map((user) => user.textContent);

    expect(actualUserNames).toEqual(mockUserNames);
  });

  it("renders current user when no other users passed with prop", async () => {
    const mockSessionWithCurrentUser = {
      ...mockNewSession,
      users: [mockCurrentUser],
    };

    const page = await MatchSessionListItem({
      matchSession: mockSessionWithCurrentUser,
    });
    render(page);

    const mockUserName = "You";
    const actualUserName = screen.getByTestId("user").textContent;

    expect(actualUserName).toEqual(mockUserName);
  });

  it("renders status when match is not started", async () => {
    const page = await MatchSessionListItem({
      matchSession: mockNewSession,
    });
    render(page);

    const status = screen.getByText(/not started/i);

    expect(status).toBeInTheDocument();
  });

  it("renders number of matches passed with prop when match is started", async () => {
    const mockStartedSession = mockMatchSession(
      "1",
      [],
      [],
      mockUsers,
      true,
      5,
    );

    const page = await MatchSessionListItem({
      matchSession: mockStartedSession,
    });
    render(page);

    const matchCountPattern = new RegExp(
      `${mockStartedSession.match_count} matches`,
      "i",
    );
    const matchCount = screen.getByText(matchCountPattern);

    expect(matchCount).toBeInTheDocument();
  });
});
