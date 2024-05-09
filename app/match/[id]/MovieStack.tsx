"use client";

import { MatchSession, Movie } from "@/app/lib/definitions";
import { TMDB_PAGE_LIMIT } from "@/app/lib/tmdbConfiguration";
import {
  getMovies,
  rateMovie,
  undoMovieRating,
} from "@/app/match/[id]/actions";
import MovieCard from "@/app/match/[id]/MovieCard";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SwipeButtonRow } from "./SwipeButtonRow";
import MatchModal from "@/app/match/[id]/MatchModal";
import useMatches from "@/app/match/[id]/useMatches";
import { filterUniqueObjectArray } from "@/app/lib/util";
import { ErrorMessage } from "@/app/components/ErrorMessage";

const RENDER_LIMIT = 3;
const FETCH_NEXT_PAGE_LIMIT = 5;

export default function MovieStack({
  matchSession,
  movies,
}: {
  matchSession: MatchSession;
  movies: Array<Movie>;
}) {
  const [ratedMovies, setRatedMovies] =
    useState<Array<Movie & { isLiked?: boolean }>>(movies);

  const [page, setPage] = useState(1);
  const isLoading = useRef(false);
  const [error, setError] = useState<string>();
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const {
    isOpen: isMatchOpen,
    onOpen: onMatchOpen,
    onOpenChange: onMatchOpenChange,
  } = useDisclosure();
  const { matches, mutateMatches } = useMatches(matchSession.id, isMatchOpen);

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
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setRatedMovies((prev) =>
        filterUniqueObjectArray([...prev, ...fetchedMovies], "id"),
      );
      setPage((prev) => prev + fetchedPageCount);
      isLoading.current = false;
    }
  }, [matchSession.id, page]);

  useEffect(() => {
    if (!isLoading.current && shouldFetchNextMovies) {
      fetchNextMoviePage();
    }
  }, [fetchNextMoviePage, shouldFetchNextMovies]);

  useEffect(() => {
    if (matches?.length && matches.length > 0) {
      onMatchOpen();
    }
  }, [matches, onMatchOpen]);

  const toggleInfo = () => {
    setIsInfoVisible((prevState) => !prevState);
  };

  const handleRateMovie = async (
    movie: Movie | undefined,
    isLiked?: boolean,
  ) => {
    if (!movie) return;
    setIsInfoVisible(false);

    const updatedMovies = ratedMovies.map((mapMovie) => {
      if (mapMovie.id === movie.id) {
        return { ...mapMovie, isLiked };
      } else {
        return mapMovie;
      }
    });

    setRatedMovies(updatedMovies);

    isLiked === undefined
      ? await undoMovieRating(movie.id)
      : await rateMovie(movie.id, isLiked);

    mutateMatches();
  };

  return (
    <div className="relative h-dvh w-dvw overflow-hidden">
      <div className="relative h-[calc(100%-4.5rem)] overflow-hidden">
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
              <ErrorMessage>{error}</ErrorMessage>
              <Button onPress={fetchNextMoviePage} size="lg" color="primary">
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <SwipeButtonRow
          onLike={handleRateMovie.bind(null, nextRatedMovie, true)}
          onDislike={handleRateMovie.bind(null, nextRatedMovie, false)}
          onUndoRating={handleRateMovie.bind(null, lastRatedMovie, undefined)}
          onToggleInfo={toggleInfo}
          isDisabled={!nextRatedMovie}
        />
      </div>
      <MatchModal
        matches={matches}
        isOpen={isMatchOpen}
        onOpenChange={onMatchOpenChange}
      />
    </div>
  );
}
