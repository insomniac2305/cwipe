import { auth } from "@/app/lib/auth";
import MatchSessionLobby from "@/app/match/[id]/components/MatchSessionLobby";
import MovieStack from "@/app/match/[id]/components/MovieStack";
import { mockMovie } from "@/app/match/[id]/lib/__mocks__/actions";
import {
  addUserToMatchSession,
  getMatchSession,
  getMovies,
} from "@/app/match/[id]/lib/actions";
import MatchSession from "@/app/match/[id]/page";
import { mockMatchSession } from "@/app/match/lib/__mocks__/actions";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/lib/auth");
vi.mock("@/app/match/[id]/lib/actions");
vi.mock("@/app/match/[id]/components/MovieStack");
vi.mock("@/app/match/[id]/components/MatchSessionLobby");

const mockCurrentUser = { id: "1", name: "One" };
const mockNewSession = mockMatchSession("1", [], [], [], false);
const mockStartedSession = mockMatchSession("1", [], [], [], true);
const mockMovies = [mockMovie(1, "Movie One")];

describe("Match Session", () => {
  beforeEach(() => {
    vi.mocked(auth, { partial: true }).mockResolvedValueOnce({
      user: mockCurrentUser,
    });
    vi.mocked(MatchSessionLobby).mockClear();
    vi.mocked(MovieStack).mockClear();
  });

  it("adds user when match session is not started and user has not joined yet", async () => {
    vi.mocked(getMatchSession).mockResolvedValueOnce({ data: mockNewSession });

    const page = await MatchSession({ params: { id: mockNewSession.id } });
    render(page);

    expect(addUserToMatchSession).toHaveBeenCalledWith(mockNewSession.id);
  });

  it("renders match session lobby when session is not started and user has joined", async () => {
    const mockSessionWithCurrentUser = {
      ...mockNewSession,
      users: [mockCurrentUser],
    };

    vi.mocked(getMatchSession).mockResolvedValueOnce({
      data: mockSessionWithCurrentUser,
    });

    const page = await MatchSession({
      params: { id: mockSessionWithCurrentUser.id },
    });
    render(page);

    expect(MatchSessionLobby).toHaveBeenCalledWith(
      {
        matchSession: mockSessionWithCurrentUser,
        session: { user: mockCurrentUser },
      },
      // not sure why the second empty object is passed, but test passes only like this
      {},
    );
  });

  it("throws error when session is started but user has not joined", async () => {
    vi.mocked(getMatchSession).mockResolvedValueOnce({
      data: mockStartedSession,
    });

    await expect(async () => {
      const page = await MatchSession({
        params: { id: mockStartedSession.id },
      });
      render(page);
    }).rejects.toThrowError(/already started/i);
  });

  it("renders movie stack with data passed as prop when session is started and user has joined", async () => {
    const mockSessionWithCurrentUser = {
      ...mockStartedSession,
      users: [mockCurrentUser],
    };

    vi.mocked(getMatchSession).mockResolvedValueOnce({
      data: mockSessionWithCurrentUser,
    });

    vi.mocked(getMovies).mockResolvedValueOnce({
      data: mockMovies,
    });

    const page = await MatchSession({
      params: { id: mockSessionWithCurrentUser.id },
    });
    render(page);

    expect(MovieStack).toHaveBeenCalledWith(
      {
        matchSession: mockSessionWithCurrentUser,
        movies: mockMovies,
      },
      // not sure why the second empty object is passed, but test passes only like this
      {},
    );
  });
});
