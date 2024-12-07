import { vi } from "vitest";

export const createMatchSession = vi.fn();

export const getMatchSessions = vi.fn();

export const mockMatchSession = (
  id = "",
  providers = [],
  genres = [],
  users = [],
  is_started = false,
  match_count = 0,
) => {
  return {
    id,
    providers,
    genres,
    users,
    is_started,
    match_count,
  };
};
