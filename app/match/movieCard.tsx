import {
  DiscoverMovies,
  SwipeCardRef,
  SwipeDirection,
} from "@/app/lib/definitions";
import SwipeCard from "@/app/match/swipeCard";
import Image from "next/image";
import { useRef } from "react";
import {
  HiArrowUturnLeft,
  HiHandThumbDown,
  HiHandThumbUp,
  HiInformationCircle,
  HiMiniStar,
} from "react-icons/hi2";

export default function MovieCard({
  movie,
  onRateMovie,
  onUndoRating,
}: {
  movie: DiscoverMovies["results"][number];
  onRateMovie: (
    movie: DiscoverMovies["results"][number],
    isLiked: boolean,
  ) => void;
  onUndoRating: () => void;
}) {
  const swipeRef = useRef<SwipeCardRef>(null);
  const simulateSwipe = (direction: SwipeDirection) => {
    swipeRef.current?.swipe(direction);
  };

  return (
    <>
      <SwipeCard
        onSwipeLeft={onRateMovie.bind(null, movie, false)}
        onSwipeRight={onRateMovie.bind(null, movie, true)}
        ref={swipeRef}
      >
        <div className="relative h-full w-full bg-gray-900">
          <div className="relative h-[90%] w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.poster_path}`}
              fill={true}
              className="object-cover opacity-0 transition-opacity duration-500"
              onLoad={(e) =>
                ((e.target as HTMLImageElement).style.opacity = "1")
              }
              alt={movie.title}
              draggable={false}
            />
          </div>
          <div className="absolute bottom-0 flex h-72 w-full flex-col justify-center gap-2 bg-gradient-to-t from-gray-900 from-40% via-gray-900/90 via-70% p-6">
            <h1 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold text-gray-50">
              {movie.title}
            </h1>
            <ul className="flex gap-2 text-xs text-gray-200">
              <li className="rounded-full bg-slate-700 p-2">Science Fiction</li>
              <li className="rounded-full bg-slate-700 p-2">Action</li>
            </ul>
            <p className="text-sm text-gray-200">
              <HiMiniStar className="relative top-[1px] inline align-baseline" />{" "}
              {movie.vote_average} - {movie.release_date.slice(0, 4)} - 1h 45m
            </p>
          </div>
        </div>
      </SwipeCard>
      <div className="absolute bottom-0 flex w-full items-center justify-evenly p-4">
        <button
          className="rounded-full bg-slate-500 p-2 text-2xl text-gray-50"
          onClick={onUndoRating}
        >
          <HiArrowUturnLeft />
        </button>
        <button
          className="rounded-full bg-pink-600 p-2 text-4xl text-gray-50"
          onClick={simulateSwipe.bind(null, "left")}
        >
          <HiHandThumbDown />
        </button>
        <button
          className="rounded-full bg-indigo-600 p-2 text-4xl text-gray-50"
          onClick={simulateSwipe.bind(null, "right")}
        >
          <HiHandThumbUp />
        </button>
        <button className="rounded-full bg-slate-500 p-2 text-2xl text-gray-50">
          <HiInformationCircle />
        </button>
      </div>
    </>
  );
}
