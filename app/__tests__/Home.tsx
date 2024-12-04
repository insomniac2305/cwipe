import "@/app/__mocks__/IntersectionObserver";
import "@/app/__mocks__/Image";
import { mockDiscoverMovie } from "@/app/lib/__mocks__/actions";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { getTopMovies } from "@/app/lib/actions";
import Home from "@/app/page";

vi.mock("@/app/lib/actions");
const mockGetTopMovies = vi.mocked(getTopMovies);

const mockTopMovies = [
  mockDiscoverMovie("1", "1.jpg"),
  mockDiscoverMovie("2", "2.jpg"),
  mockDiscoverMovie("3", "3.jpg"),
];

describe("Home", () => {
  it("renders link to login page", async () => {
    mockGetTopMovies.mockResolvedValueOnce({ data: mockTopMovies });
    const page = await Home();
    render(page);

    const heading = screen.getByRole("button", { name: "Get started" });

    expect(heading).toHaveAttribute("href", "/login");
  });
});
