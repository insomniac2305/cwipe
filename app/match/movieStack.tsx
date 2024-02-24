"use client";

import { Movie } from "@/app/lib/definitions";
import { rateMovie, undoMovieRating } from "@/app/match/actions";
import MovieCard from "@/app/match/movieCard";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import {
  HiArrowUturnLeft,
  HiHandThumbDown,
  HiHandThumbUp,
  HiInformationCircle,
} from "react-icons/hi2";

export default function MovieStack({ movies }: { movies: Array<Movie> }) {
  const [ratedMovies, setRatedMovies] = useState<
    Array<Movie & { isLiked?: boolean }>
  >([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfo = () => {
    setIsInfoVisible((prevState) => !prevState);
  };

  const handleRateMovie = (movie: Movie | undefined, isLiked: boolean) => {
    if (!movie) return;
    setIsInfoVisible(false);

    const ratedIndex = ratedMovies.findIndex(
      (findMovie) => findMovie.id === movie.id,
    );

    if (ratedIndex > -1) {
      const updatedMovies = ratedMovies.map((mapMovie) => {
        if (mapMovie.id === movie.id) {
          return { ...mapMovie, isLiked };
        } else {
          return mapMovie;
        }
      });

      setRatedMovies(updatedMovies);
    } else {
      setRatedMovies((prevState) => [...prevState, { ...movie, isLiked }]);
    }

    rateMovie(movie.id, isLiked);
  };

  const handleUndoRating = (id?: number) => {
    if (!id) return;
    setIsInfoVisible(false);

    const updatedMovies = ratedMovies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, isLiked: undefined };
      } else {
        return movie;
      }
    });

    setRatedMovies(updatedMovies);
    undoMovieRating(id);
  };

  const renderedMovies = [...ratedMovies];
  const renderedMovieIds = renderedMovies.map((movie) => movie.id);
  movies.forEach((movie) => {
    if (!renderedMovieIds.includes(movie.id)) {
      renderedMovies.push({ ...movie, isLiked: undefined });
    }
  });

  const nextRatedMovie = renderedMovies.find(
    (movie) => movie.isLiked === undefined,
  );
  const lastRatedMovie = ratedMovies.findLast(
    (movie) => movie.isLiked !== undefined,
  );

  return (
    <div className="relative h-dvh w-dvw overflow-hidden">
      <div className="relative h-[calc(100%-4.5rem)] overflow-hidden">
        {renderedMovies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRateMovie={handleRateMovie}
            zIndex={renderedMovies.length - index}
            isLiked={movie.isLiked}
            isInfoVisible={isInfoVisible && movie.id === nextRatedMovie?.id}
          />
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
        <SwipeButtonRow
          onLike={handleRateMovie.bind(null, nextRatedMovie, true)}
          onDislike={handleRateMovie.bind(null, nextRatedMovie, false)}
          onUndoRating={handleUndoRating.bind(null, lastRatedMovie?.id)}
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
    <div className="flex w-full items-center justify-evenly bg-gray-900 p-4 pt-2">
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
