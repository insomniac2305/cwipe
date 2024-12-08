import { vi } from "vitest";

export const useSideNavContext = () => ({
  isSideNavVisible: false,
  toggleSideNav: vi.fn(),
});

export const MatchLayout = vi.fn();
