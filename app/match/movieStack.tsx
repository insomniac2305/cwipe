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
    Array<DiscoverMovies["results"][number]>
  >([]);

  const handleRateMovie = (
    movie: DiscoverMovies["results"][number],
    isLiked: boolean,
  ) => {
    setRatedMovies((prevState) => [...prevState, movie]);
    rateMovie(movie.id, isLiked);
  };

  const handleUndoRating = () => {
    const ratedMovie = ratedMovies[ratedMovies.length - 1];
    if (!ratedMovie) return;
    setRatedMovies((prevState) => prevState.slice(0, prevState.length - 1));
    undoMovieRating(ratedMovie.id);
  };

  return (
    <div className="relative min-h-screen">
      {movies.map(
        (movie, index) =>
          ratedMovies.includes(movie) || (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRateMovie={handleRateMovie}
              onUndoRating={handleUndoRating}
              zIndex={movies.length - index}
            />
          ),
      )}
    </div>
  );
}
