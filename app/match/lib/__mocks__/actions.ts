import { MatchSession, MatchSessionUser } from "@/app/lib/definitions";
import { vi } from "vitest";

export const createMatchSession = vi.fn();

export const getMatchSessions = vi.fn();

export const mockMatchSession = (
  id = "",
  providers: number[] = [],
  genres: number[] = [],
  users: MatchSessionUser[] = [],
  is_started = false,
  match_count = 0,
): MatchSession => {
  return {
    id,
    providers,
    genres,
    users,
    is_started,
    match_count,
  };
};
