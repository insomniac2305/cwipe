import { useSideInfoContext } from "@/app/match/[id]/components/MatchSessionLayout";
import MovieStack from "@/app/match/[id]/components/MovieStack";
import {
  mockMovie,
  mockMovieMatch,
} from "@/app/match/[id]/lib/__mocks__/actions";
import { getMovies, rateMovie } from "@/app/match/[id]/lib/actions";
import useMatches from "@/app/match/[id]/lib/useMatches";
import { useSideNavContext } from "@/app/match/components/MatchLayout";
import { mockMatchSession } from "@/app/match/lib/__mocks__/actions";
import { useDisclosure } from "@nextui-org/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/match/[id]/components/MovieCard");
vi.mock("@/app/match/[id]/components/MatchSessionLayout");
vi.mock("@/app/match/components/MatchLayout");
vi.mock("@/app/match/[id]/lib/useMatches");
vi.mock("@/app/match/[id]/lib/actions");
vi.mock("@nextui-org/react", async () => {
  const nextUI = await vi.importActual("@nextui-org/react");
  return {
    ...nextUI,
    useDisclosure: vi.fn(),
  };
});

const mockOnOpen = vi.fn();
vi.mocked(useDisclosure).mockReturnValue({
  isOpen: false,
  onOpen: mockOnOpen,
  onClose: vi.fn(),
  onOpenChange: vi.fn(),
  isControlled: false,
  getButtonProps: vi.fn(),
  getDisclosureProps: vi.fn(),
});

vi.mocked(useMatches).mockReturnValue({
  matches: [],
  newMatches: [],
  mutateMatches: vi.fn(),
  error: undefined,
});

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

describe("Movie Stack", () => {
  beforeEach(() => {
    vi.mocked(getMovies).mockClear();
    vi.mocked(rateMovie).mockClear();
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

  it("renders menu button when side navigation is not visible", () => {
    vi.mocked(useSideNavContext).mockReturnValue({
      isSideNavVisible: false,
      toggleSideNav: vi.fn(),
    });

    render(
      <MovieStack movies={mockMovies} matchSession={mockedMatchSession} />,
    );

    const menuButton = screen.getByRole("button", { name: /menu/i });

    expect(menuButton).toBeInTheDocument();
  });

  it("renders match list button when match list is not visible", () => {
    vi.mocked(useSideInfoContext).mockReturnValue({
      isSideInfoVisible: false,
      toggleSideInfo: vi.fn(),
    });

    render(
      <MovieStack movies={mockMovies} matchSession={mockedMatchSession} />,
    );

    const matchListButton = screen.getByRole("button", { name: /match list/i });

    expect(matchListButton).toBeInTheDocument();
  });

  it("calls rate movie for rendered movies when rating buttons are clicked", async () => {
    render(
      <MovieStack movies={mockMovies} matchSession={mockedMatchSession} />,
    );

    const likeButton = screen.getByRole("button", { name: "Like" });
    fireEvent.click(likeButton);

    const dislikeButton = screen.getByRole("button", { name: "Dislike" });
    fireEvent.click(dislikeButton);

    const undoButton = screen.getByRole("button", { name: "Undo" });
    fireEvent.click(undoButton);

    await waitFor(() => {
      expect(rateMovie).toHaveBeenNthCalledWith(1, mockMovieOne.id, true);
      expect(rateMovie).toHaveBeenNthCalledWith(2, mockMovieTwo.id, false);
      expect(rateMovie).toHaveBeenNthCalledWith(3, mockMovieTwo.id, undefined);
    });
  });

  it("does not render already rated movies", async () => {
    render(
      <MovieStack movies={mockMovies} matchSession={mockedMatchSession} />,
    );

    const likeButton = screen.getByRole("button", { name: "Like" });
    fireEvent.click(likeButton);

    const firstMovie = screen.queryByText(mockMovieOne.title);
    expect(firstMovie).not.toBeInTheDocument();
  });

  it("opens match modal when new matches were fetched", () => {
    const { rerender } = render(
      <MovieStack movies={mockMovies} matchSession={mockedMatchSession} />,
    );

    expect(mockOnOpen).not.toHaveBeenCalled();

    vi.mocked(useMatches).mockReturnValueOnce({
      matches: [],
      newMatches: [
        mockMovieMatch(new Date(), mockMovieOne.id, mockMovieOne.title),
      ],
      mutateMatches: vi.fn(),
      error: undefined,
    });

    rerender(
      <MovieStack movies={mockMovies} matchSession={mockedMatchSession} />,
    );

    expect(mockOnOpen).toHaveBeenCalled();
  });
});
