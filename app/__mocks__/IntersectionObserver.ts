import { vi } from "vitest";

const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
  root: null,
  rootMargin: "",
  thresholds: [],
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", mockIntersectionObserver);
