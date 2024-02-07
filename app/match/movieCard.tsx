import { DiscoverMovies, SwipeCardRef, SwipeDirection } from "@/app/lib/definitions";
import SwipeCard from "@/app/match/swipeCard";
import Image from "next/image";
import { useRef } from "react";
import { HiArrowUturnLeft, HiHandThumbDown, HiHandThumbUp, HiInformationCircle, HiMiniStar } from "react-icons/hi2";

export default function MovieCard({
  movie,
  onRateMovie,
  onUndoRating,
}: {
  movie: DiscoverMovies["results"][number];
  onRateMovie: (movie: DiscoverMovies["results"][number], isLiked: boolean) => void;
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
          <div className="bg-gradient-to-t from-gray-900 from-40% via-gray-900/90 via-70% h-72 w-full absolute bottom-0 p-6 flex flex-col gap-2 justify-center">
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
      <div className="flex absolute bottom-0 p-4 justify-evenly w-full items-center">
        <button className="bg-slate-500 p-2 rounded-full text-gray-50 text-2xl" onClick={onUndoRating}>
          <HiArrowUturnLeft />
        </button>
        <button
          className="bg-pink-600 p-2 rounded-full text-gray-50 text-4xl"
          onClick={simulateSwipe.bind(null, "left")}
        >
          <HiHandThumbDown />
        </button>
        <button
          className="bg-indigo-600 p-2 rounded-full text-gray-50 text-4xl"
          onClick={simulateSwipe.bind(null, "right")}
        >
          <HiHandThumbUp />
        </button>
        <button className="bg-slate-500 p-2 rounded-full text-gray-50 text-2xl">
          <HiInformationCircle />
        </button>
      </div>
    </>
  );
}
