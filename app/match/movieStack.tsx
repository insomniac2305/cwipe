"use client";

import { DiscoverMovies } from "@/app/lib/definitions";
import { rateMovie } from "@/app/match/actions";
import MovieCard from "@/app/match/movieCard";
import { useState } from "react";

export default function MovieStack({ movies }: { movies: DiscoverMovies["results"] }) {
  const [ratedMovies, setRatedMovies] = useState<Array<number>>([]);
  const handleRateMovie = (id: number, isLiked: boolean) => {
    setRatedMovies((prevState) => [...prevState, id]);
    rateMovie(id, isLiked);
  };

  return (
    <ul className="relative min-h-screen">
      {movies.map(
        (movie, index) =>
          ratedMovies.includes(movie.id) || (
            <li className={`absolute top-0 h-full w-full`} key={movie.id} style={{ zIndex: movies.length - index }}>
              <MovieCard movie={movie} onRateMovie={handleRateMovie} />
            </li>
          )
      )}
    </ul>
  );
}
