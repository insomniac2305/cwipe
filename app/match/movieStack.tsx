"use client";

import { DiscoverMovies } from "@/app/lib/definitions";
import { rateMovie } from "@/app/match/actions";
import SwipeCard from "@/app/match/swipeCard";
import Image from "next/image";
import { useState } from "react";
import { HiMiniStar } from "react-icons/hi2";

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
                  <div className="relative h-[90%] w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.poster_path}`}
                      fill={true}
                      className="object-cover opacity-0 transition-opacity duration-500"
                      onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
                      alt={movie.title}
                      draggable={false}
                    />
                  </div>
                  <div className="bg-gradient-to-t from-gray-900 from-40% via-gray-900/90 via-70% h-1/3 w-full absolute bottom-0 p-6 flex flex-col gap-2 justify-center">
                    <h1 className="w-full text-2xl font-bold text-gray-50 whitespace-nowrap text-ellipsis overflow-hidden">
                      {movie.title}
                    </h1>
                    <ul className="flex gap-2 text-gray-200 text-xs">
                      <li className="p-2 bg-slate-700 rounded-full">Science Fiction</li>
                      <li className="p-2 bg-slate-700 rounded-full">Action</li>
                    </ul>
                    <p className="text-sm text-gray-200">
                      <HiMiniStar className="inline relative top-[1px] align-baseline" /> {movie.vote_average} -{" "}
                      {movie.release_date.slice(0, 4)} - 1h 45m
                    </p>
                  </div>
                </div>
              </SwipeCard>
            </li>
          )
      )}
    </ul>
  );
}
