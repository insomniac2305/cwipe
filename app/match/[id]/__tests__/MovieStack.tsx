import MovieStack from "@/app/match/[id]/components/MovieStack";
import { mockMovie } from "@/app/match/[id]/lib/__mocks__/actions";
import { getMovies } from "@/app/match/[id]/lib/actions";
import useMatches from "@/app/match/[id]/lib/useMatches";
import { mockMatchSession } from "@/app/match/lib/__mocks__/actions";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/match/[id]/components/MovieCard");
vi.mock("@/app/match/[id]/components/MatchSessionLayout");
vi.mock("@/app/match/components/MatchLayout");
vi.mock("@/app/match/[id]/lib/useMatches");
vi.mock("@/app/match/[id]/lib/actions");

const mockMovieOne = mockMovie(1, "One");
const mockMovieTwo = mockMovie(2, "Two");
const mockMovieThree = mockMovie(3, "Three");
const mockMovieFour = mockMovie(4, "Four");
const mockMovieFive = mockMovie(5, "Five");
const mockMovieSix = mockMovie(6, "Six");

const mockMovies = [
  mockMovieOne,
  mockMovieTwo,
  mockMovieThree,
  mockMovieFour,
  mockMovieFive,
  mockMovieSix,
];

const mockedMatchSession = mockMatchSession("1", [], [], [], true, 0);

vi.mocked(useMatches).mockReturnValue({
  matches: [],
  newMatches: [],
  mutateMatches: vi.fn(),
  error: undefined,
});

describe("Movie Stack", () => {
  beforeEach(() => {
    vi.mocked(getMovies).mockClear();
  });

  it("renders the first four movies passed initally as prop", async () => {
    render(
      <MovieStack movies={mockMovies} matchSession={mockedMatchSession} />,
    );

    const actualMovieTitles = (await screen.findAllByTestId("movie-card")).map(
      (movie) => movie.textContent,
    );
    const mockMovieTitles = mockMovies.slice(0, 4).map((movie) => movie.title);

    expect(actualMovieTitles).toEqual(mockMovieTitles);
  });

  it("renders the first four movies passed initally as prop and fetched afterwards", async () => {
    vi.mocked(getMovies).mockResolvedValue({
      data: [mockMovieTwo, mockMovieThree, mockMovieFour, mockMovieFive],
    });

    render(
      <MovieStack movies={[mockMovieOne]} matchSession={mockedMatchSession} />,
    );

    await waitFor(() => expect(getMovies).toHaveResolved());

    const actualMovieTitles = (await screen.findAllByTestId("movie-card")).map(
      (movie) => movie.textContent,
    );
    const mockMovieTitles = mockMovies.slice(0, 4).map((movie) => movie.title);

    expect(actualMovieTitles).toEqual(mockMovieTitles);
  });

  it("continues fetching movies only until at least five were fetched", async () => {
    vi.mocked(getMovies)
      .mockResolvedValueOnce({
        data: [mockMovieOne, mockMovieTwo, mockMovieThree],
      })
      .mockResolvedValueOnce({
        data: [mockMovieFour],
      })
      .mockResolvedValueOnce({
        data: [mockMovieFive],
      })
      .mockResolvedValueOnce({
        data: [mockMovieSix],
      });

    render(<MovieStack movies={[]} matchSession={mockedMatchSession} />);

    await waitFor(() => expect(getMovies).toHaveResolvedTimes(3));
  });

  it("renders error message when fetching of movies failed", async () => {
    vi.mocked(getMovies).mockResolvedValueOnce({ error: { message: "error" } });

    render(
      <MovieStack movies={[mockMovieOne]} matchSession={mockedMatchSession} />,
    );

    await waitFor(() => expect(getMovies).toHaveResolved());

    const error = screen.getByText(/error/i);

    expect(error).toBeInTheDocument();
  });
});
