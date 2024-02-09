"use client";

import { DiscoverMovies } from "@/app/lib/definitions";
import { rateMovie, undoMovieRating } from "@/app/match/actions";
import MovieCard from "@/app/match/movieCard";
import { useState } from "react";

export default function MovieStack({
  movies,
}: {
  movies: DiscoverMovies["results"];
}) {
  const [ratedMovies, setRatedMovies] = useState<
    Array<DiscoverMovies["results"][number] & { isLiked?: boolean }>
  >([]);

  const handleRateMovie = (
    movie: DiscoverMovies["results"][number],
    isLiked: boolean,
  ) => {
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

  const handleUndoRating = (id: number) => {
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

  return (
    <div className="relative min-h-screen">
      {renderedMovies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onRateMovie={handleRateMovie}
          onUndoRating={handleUndoRating.bind(
            null,
            renderedMovies[index - 1]?.id,
          )}
          zIndex={renderedMovies.length - index}
          isLiked={movie.isLiked}
        />
      ))}
    </div>
  );
}
