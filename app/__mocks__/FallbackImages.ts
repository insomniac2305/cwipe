import { vi } from "vitest";

vi.mock("@/public/movie-poster-fallback-1.jpg", () => ({
  default: "/movie-poster-fallback-1.jpg",
}));
vi.mock("@/public/movie-poster-fallback-2.jpg", () => ({
  default: "/movie-poster-fallback-2.jpg",
}));
vi.mock("@/public/movie-poster-fallback-3.jpg", () => ({
  default: "/movie-poster-fallback-3.jpg",
}));
