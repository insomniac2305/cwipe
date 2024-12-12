import { vi } from "vitest";

export const useSideNavContext = vi.fn(() => ({
  isSideNavVisible: false,
  toggleSideNav: vi.fn(),
}));

export const MatchLayout = vi.fn();
