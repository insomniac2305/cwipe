"use client";

import { DiscoverMovies } from "@/app/lib/definitions";
import { rateMovie } from "@/app/match/actions";
import MovieCard from "@/app/match/movieCard";
import { useState } from "react";

export default function MovieStack({ movies }: { movies: DiscoverMovies["results"] }) {
  const [swipedMovies, setSwipedMovies] = useState<Array<number>>([]);
  const handleSwipe = (id: number, isLiked: boolean) => {
    setSwipedMovies((prevState) => [...prevState, id]);
    rateMovie(id, isLiked);
  };

  return (
    <ul className="relative min-h-screen">
      {movies.map(
        (movie, index) =>
          swipedMovies.includes(movie.id) || (
            <li className={`absolute top-0 h-full w-full`} key={movie.id} style={{ zIndex: movies.length - index }}>
              <MovieCard movie={movie} handleSwipe={handleSwipe} />
            </li>
          )
      )}
    </ul>
  );
}
