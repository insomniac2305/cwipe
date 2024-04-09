"use client";

import { Movie } from "@/app/lib/definitions";
import { rateMovie, undoMovieRating } from "@/app/match/[id]/actions";
import MovieCard from "@/app/match/[id]/movieCard";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import {
  HiArrowUturnLeft,
  HiHandThumbDown,
  HiHandThumbUp,
  HiInformationCircle,
} from "react-icons/hi2";

const RENDER_LIMIT = 3;

export default function MovieStack({ movies }: { movies: Array<Movie> }) {
  const [ratedMovies, setRatedMovies] =
    useState<Array<Movie & { isLiked?: boolean }>>(movies);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfo = () => {
    setIsInfoVisible((prevState) => !prevState);
  };

  const handleRateMovie = (movie: Movie | undefined, isLiked?: boolean) => {
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

    isLiked !== undefined
      ? rateMovie(movie.id, isLiked)
      : undoMovieRating(movie.id);
  };

  const currentMovieIndex = ratedMovies.findIndex(
    (movie) => movie.isLiked === undefined,
  );
  const nextRatedMovie = ratedMovies[currentMovieIndex];
  const lastRatedMovie = ratedMovies.findLast(
    (movie) => movie.isLiked !== undefined,
  );

  return (
    <div className="relative h-dvh w-dvw overflow-hidden">
      <div className="relative h-[calc(100%-4.5rem)] overflow-hidden">
        {ratedMovies.map(
          (movie, index) =>
            index <= currentMovieIndex + RENDER_LIMIT && (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRateMovie={handleRateMovie}
                zIndex={ratedMovies.length - index}
                isLiked={movie.isLiked}
                isInfoVisible={isInfoVisible && movie.id === nextRatedMovie?.id}
              />
            ),
        )}
      </div>
      <div className="absolute bottom-0 w-full">
        <SwipeButtonRow
          onLike={handleRateMovie.bind(null, nextRatedMovie, true)}
          onDislike={handleRateMovie.bind(null, nextRatedMovie, false)}
          onUndoRating={handleRateMovie.bind(null, lastRatedMovie, undefined)}
          onToggleInfo={toggleInfo}
        />
      </div>
    </div>
  );
}

function SwipeButtonRow({
  onLike,
  onDislike,
  onUndoRating,
  onToggleInfo,
}: {
  onLike: () => void;
  onDislike: () => void;
  onUndoRating: () => void;
  onToggleInfo: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-evenly bg-default-50 p-4 pt-2">
      <Button
        className="text-xl"
        aria-label="Undo"
        radius="full"
        variant="flat"
        onPress={onUndoRating}
        isIconOnly
      >
        <HiArrowUturnLeft />
      </Button>
      <Button
        className="text-3xl"
        size="lg"
        aria-label="Dislike"
        radius="full"
        color="secondary"
        onPress={onDislike}
        isIconOnly
      >
        <HiHandThumbDown />
      </Button>
      <Button
        className="text-3xl"
        size="lg"
        aria-label="Like"
        radius="full"
        color="primary"
        onPress={onLike}
        isIconOnly
      >
        <HiHandThumbUp />
      </Button>
      <Button
        className="text-xl"
        aria-label="More Info"
        radius="full"
        variant="flat"
        onPress={onToggleInfo}
        isIconOnly
      >
        <HiInformationCircle />
      </Button>
    </div>
  );
}
