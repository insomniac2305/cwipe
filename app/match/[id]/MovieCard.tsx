import { Movie, SwipeCardRef, SwipeDirection } from "@/app/lib/definitions";
import SwipeCard from "@/app/match/[id]/SwipeCard";
import clsx from "clsx";
import NextImage from "next/image";

import { useEffect, useRef } from "react";
import { GenreList } from "./GenreList";
import { ActorList } from "./ActorList";
import { WatchProviderList } from "./WatchProviderList";
import { MovieKeyFacts } from "@/app/match/[id]/MovieKeyFacts";

export default function MovieCard({
  movie,
  zIndex,
  isLiked,
  isInfoVisible,
  onRateMovie,
}: {
  movie: Movie;
  zIndex: number;
  isLiked?: boolean;
  isInfoVisible: boolean;
  onRateMovie: (movie: Movie, isLiked: boolean) => void;
}) {
  const swipeRef = useRef<SwipeCardRef>(null);
  const simulateSwipe = (
    direction: SwipeDirection,
    shouldCallHandler: boolean,
  ) => {
    swipeRef.current?.swipe(direction, shouldCallHandler);
  };

  useEffect(() => {
    if (isLiked === undefined) {
      swipeRef.current?.undoSwipe();
    } else if (isLiked === true) {
      simulateSwipe("right", false);
    } else if (isLiked === false) {
      simulateSwipe("left", false);
    }
  }, [isLiked]);

  return (
    <>
      <SwipeCard
        onSwipeLeft={onRateMovie.bind(null, movie, false)}
        onSwipeRight={onRateMovie.bind(null, movie, true)}
        ref={swipeRef}
        zIndex={zIndex}
        isActive={!isInfoVisible}
      >
        <div className="relative flex h-full w-full select-none xl:bg-default-50/80">
          <NextImage
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`}
            fill={true}
            className="-z-20 hidden h-full w-full object-cover opacity-0 transition-opacity duration-500 xl:block"
            onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
            alt={movie.title + " backdrop"}
            draggable={false}
          />
          <div
            className={clsx(
              "absolute top-0 h-full w-full p-0 transition-transform duration-300 xl:static xl:h-auto xl:w-1/2",
              isInfoVisible && "-translate-y-1/2 xl:-translate-y-0",
            )}
          >
            <div className="absolute top-[calc(100%-10rem)] flex h-full w-full flex-col bg-gradient-to-b from-transparent via-default-50/90 via-[4rem] to-default-50 to-[7rem] transition-all xl:static xl:justify-center xl:bg-none">
              <div className="flex h-40 w-full flex-col justify-end gap-2 px-6 pb-3 xl:mt-10 xl:h-fit">
                <h1 className="line-clamp-2 w-full text-ellipsis font-heading text-2xl xl:line-clamp-none xl:text-4xl">
                  {movie.title}
                </h1>
                <GenreList
                  genres={movie.genres}
                  isResponsive
                  hasScrollbarOnHover
                />
                <MovieKeyFacts
                  voteAverage={movie.vote_average}
                  releaseDate={movie.release_date}
                  runtime={movie.runtime}
                  shouldScale
                />
              </div>
              <div
                className={clsx(
                  "mb-6 h-1/2 bg-default-50 px-6 xl:h-fit xl:overflow-y-auto xl:bg-transparent",
                  isInfoVisible && "overflow-y-auto",
                )}
              >
                <div
                  className={clsx(
                    "opacity-0 transition-opacity duration-300 xl:opacity-100",
                    isInfoVisible && "opacity-100",
                  )}
                >
                  {movie.watch_providers?.flatrate && (
                    <>
                      <h2 className="mb-1 mt-4 font-heading text-xl">
                        Available on
                      </h2>
                      <WatchProviderList
                        watchProviders={movie.watch_providers}
                        movieId={movie.id}
                        hasScrollbarOnHover
                      />
                    </>
                  )}
                  <h2 className="mb-1 mt-4 font-heading text-xl">
                    Description
                  </h2>
                  <p className="text-base leading-snug text-gray-200">
                    {movie.overview}
                  </p>
                  <h2 className="mb-1 mt-4 font-heading text-xl">Cast</h2>
                  <ActorList actors={movie.cast} />
                </div>
              </div>
            </div>
          </div>
          <div className="-z-10 flex h-full w-full items-center justify-center xl:z-0 xl:w-1/2">
            <div className="relative h-full w-full overflow-hidden xl:h-3/4 xl:w-5/6 xl:max-w-lg xl:rounded-xl">
              <NextImage
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.poster_path}`}
                fill={true}
                className="h-full w-full object-cover opacity-0 transition-opacity duration-500"
                onLoad={(e) =>
                  ((e.target as HTMLImageElement).style.opacity = "1")
                }
                alt={movie.title}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </SwipeCard>
    </>
  );
}
