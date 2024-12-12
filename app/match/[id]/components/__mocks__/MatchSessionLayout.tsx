import { vi } from "vitest";

export const useSideInfoContext = vi.fn(() => ({
  isSideInfoVisible: false,
  toggleSideNav: vi.fn(),
}));

export const MatchSessionLayout = vi.fn();
