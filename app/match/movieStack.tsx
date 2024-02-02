"use client";

import { DiscoverMovies } from "@/app/lib/definitions";
import { rateMovie } from "@/app/match/actions";
import SwipeCard from "@/app/match/swipeCard";
import Image from "next/image";
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
              <SwipeCard
                onSwipeLeft={handleSwipe.bind(null, movie.id, false)}
                onSwipeRight={handleSwipe.bind(null, movie.id, true)}
              >
                <div className="relative bg-gray-900 h-full w-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.poster_path}`}
                    fill={true}
                    className="object-cover opacity-0 transition-opacity duration-500"
                    onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
                    alt={movie.title}
                    draggable={false}
                  />
                </div>
              </SwipeCard>
            </li>
          )
      )}
    </ul>
  );
}
