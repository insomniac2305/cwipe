"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Spinner, useDisclosure } from "@heroui/react";
import { filterUniqueObjectArray } from "@/app/lib/util";
import { MatchSession, Movie } from "@/app/lib/definitions";
import { TMDB_PAGE_LIMIT } from "@/app/lib/tmdbConfiguration";
import { MenuButton } from "@/app/components/MenuButton";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { MatchListButton } from "@/app/components/MatchListButton";
import { useSideNavContext } from "@/app/match/components/MatchLayout";
import { getMovies, rateMovie } from "@/app/match/[id]/lib/actions";
import useMatches from "@/app/match/[id]/lib/useMatches";
import { SwipeButtonRow } from "@/app/match/[id]/components/SwipeButtonRow";
import MovieCard from "@/app/match/[id]/components/MovieCard";
import MatchModal from "@/app/match/[id]/components/MatchModal";
import { useSideInfoContext } from "@/app/match/[id]/components/MatchSessionLayout";

const RENDER_LIMIT = 3;
const FETCH_NEXT_PAGE_LIMIT = 5;

export default function MovieStack({
  matchSession,
  movies,
}: {
  matchSession: MatchSession;
  movies: Movie[];
}) {
  const [ratedMovies, setRatedMovies] =
    useState<Array<Movie & { isLiked?: boolean }>>(movies);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<{ message: string; retry: () => void }>();
  const isLoading = useRef(false);

  const {
    isOpen: isMatchOpen,
    onOpen: onMatchOpen,
    onOpenChange: onMatchOpenChange,
  } = useDisclosure();

  const {
    newMatches,
    mutateMatches,
    error: matchError,
  } = useMatches(matchSession.id, isMatchOpen);

  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const { isSideInfoVisible } = useSideInfoContext();
  const { isSideNavVisible } = useSideNavContext();

  const currentMovieIndex = ratedMovies.findIndex(
    (movie) => movie.isLiked === undefined,
  );
  const nextRatedMovie = ratedMovies[currentMovieIndex];
  const lastRatedMovie = ratedMovies.findLast(
    (movie) => movie.isLiked !== undefined,
  );
  const shouldFetchNextMovies =
    currentMovieIndex > ratedMovies.length - FETCH_NEXT_PAGE_LIMIT;

  const fetchNextMoviePage = useCallback(async () => {
    setError(undefined);
    isLoading.current = true;
    let fetchedPageCount = 0;
    let fetchedMovies: Movie[] = [];

    try {
      let shouldContinueFetching = true;

      while (shouldContinueFetching) {
        const nextMoviePage = await getMovies(
          matchSession.id,
          page + fetchedPageCount + 1,
        );

        if (nextMoviePage.error) throw new Error(nextMoviePage.error.message);

        fetchedMovies = [...fetchedMovies, ...nextMoviePage.data];
        fetchedPageCount++;
        shouldContinueFetching =
          fetchedMovies.length < FETCH_NEXT_PAGE_LIMIT &&
          page + fetchedPageCount <= TMDB_PAGE_LIMIT;
      }
    } catch (e) {
      setError({
        message: e instanceof Error ? e.message : "Something went wrong",
        retry: fetchNextMoviePage,
      });
    } finally {
      setRatedMovies((prev) =>
        filterUniqueObjectArray([...prev, ...fetchedMovies], "id"),
      );
      setPage((prev) => prev + fetchedPageCount);
      isLoading.current = false;
    }
  }, [matchSession.id, page]);

  useEffect(() => {
    if (!isLoading.current && shouldFetchNextMovies && !error) {
      fetchNextMoviePage();
    }
  }, [fetchNextMoviePage, shouldFetchNextMovies, error]);

  useEffect(() => {
    if (newMatches?.length && newMatches.length > 0) {
      onMatchOpen();
    }
  }, [newMatches, onMatchOpen]);

  const toggleInfo = () => {
    setIsInfoVisible((prevState) => !prevState);
  };

  const handleRateMovie = async (
    movie: Movie | undefined,
    isLiked?: boolean,
  ) => {
    if (!movie) return;
    setIsInfoVisible(false);
    setError(undefined);

    const updatedMovies = ratedMovies.map((mapMovie) => {
      if (mapMovie.id === movie.id) {
        return { ...mapMovie, isLiked };
      } else {
        return mapMovie;
      }
    });

    setRatedMovies(updatedMovies);

    const response = await rateMovie(movie.id, isLiked);

    if (response?.error) {
      setError({
        message: "Error rating movie",
        retry: handleRateMovie.bind(null, movie, isLiked),
      });
    } else {
      mutateMatches();
    }
  };

  return (
    <div className="relative h-dvh w-full xl:flex xl:items-center xl:justify-center">
      {!isSideNavVisible && (
        <div className="absolute left-2 top-2 z-10">
          <MenuButton />
        </div>
      )}
      {!isSideInfoVisible && (
        <div className="absolute right-2 top-2 z-10">
          <MatchListButton />
        </div>
      )}
      <div className="relative z-0 h-[calc(100%-4.5rem)] w-full xl:mb-20 xl:h-5/6 xl:w-11/12">
        {!error &&
          ratedMovies.map(
            (movie, index) =>
              index <= currentMovieIndex + RENDER_LIMIT && (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onRateMovie={handleRateMovie}
                  zIndex={ratedMovies.length - index}
                  isLiked={movie.isLiked}
                  isInfoVisible={
                    isInfoVisible && movie.id === nextRatedMovie?.id
                  }
                />
              ),
          )}
        <div className="absolute top-0 flex h-full w-full items-center justify-center">
          {!error && !nextRatedMovie && (
            <Spinner
              size="lg"
              color="primary"
              label="Loading next recommendations"
            />
          )}
          {!!error && (
            <div className="flex flex-col items-center gap-6">
              <ErrorMessage>{error.message}</ErrorMessage>
              <Button onPress={error.retry} size="lg" color="primary">
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full items-center justify-center xl:bottom-6">
        <SwipeButtonRow
          onLike={handleRateMovie.bind(null, nextRatedMovie, true)}
          onDislike={handleRateMovie.bind(null, nextRatedMovie, false)}
          onUndoRating={handleRateMovie.bind(null, lastRatedMovie, undefined)}
          onToggleInfo={toggleInfo}
          isDisabled={!nextRatedMovie || !!error}
        />
      </div>
      <MatchModal
        matches={newMatches}
        isOpen={isMatchOpen}
        onOpenChange={onMatchOpenChange}
        error={matchError}
      />
    </div>
  );
}
