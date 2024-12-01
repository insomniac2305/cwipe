import "@/app/__mocks__/IntersectionObserver";
import { mockDiscoverMovie } from "@/app/__mocks__/actions";
import { getTopMovies } from "@/app/actions";
import Home from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("@/app/actions");
const mockGetTopMovies = jest.mocked(getTopMovies);

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
