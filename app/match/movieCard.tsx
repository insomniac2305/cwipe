import { Movie, SwipeCardRef, SwipeDirection } from "@/app/lib/definitions";
import SwipeCard from "@/app/match/swipeCard";
import { Divider, ScrollShadow, Link } from "@nextui-org/react";
import clsx from "clsx";
import NextImage from "next/image";

import { useEffect, useRef } from "react";
import { HiMiniStar } from "react-icons/hi2";
import { Genre } from "@/app/components/Genre";
import { Actor } from "@/app/components/Actor";
import { LogoImage } from "@/app/components/LogoImage";

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
        <NextImage
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${movie.poster_path}`}
          fill={true}
          className="h-full w-full object-cover opacity-0 transition-opacity duration-500"
          onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
          alt={movie.title}
          draggable={false}
        />
        <div
          className={clsx(
            "absolute top-0 h-full w-full p-0 transition-transform duration-300",
            isInfoVisible && "-translate-y-1/2",
          )}
        >
          <div className="absolute top-[calc(100%-10rem)] flex h-full w-full flex-col bg-gradient-to-b from-transparent via-gray-900/90 via-[4rem] to-gray-900 to-[7rem] transition-all">
            <div className="flex h-40 w-full flex-col justify-end gap-2 pb-3">
              <h1 className="w-full overflow-hidden text-ellipsis whitespace-nowrap px-6 text-2xl font-bold text-gray-50">
                {movie.title}
              </h1>
              <GenreList genres={movie.genres}></GenreList>
              <div className="flex gap-2 px-6 text-sm text-gray-200">
                <div>
                  <HiMiniStar className="relative top-[1px] inline align-baseline" />{" "}
                  {movie.vote_average.toFixed(1)}
                </div>
                <Divider orientation="vertical" />
                {movie.release_date.slice(0, 4)}
                <Divider orientation="vertical" />
                {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              </div>
            </div>
            <div
              className={clsx(
                "h-1/2 bg-gray-900 px-6 pb-6",
                isInfoVisible && "overflow-y-auto",
              )}
            >
              <div
                className={clsx(
                  "opacity-0 transition-opacity duration-300",
                  isInfoVisible && "opacity-100",
                )}
              >
                {movie.watch_providers?.flatrate && (
                  <>
                    <h2 className="mb-1 mt-4 text-lg font-bold text-gray-50">
                      Available on
                    </h2>
                    <WatchProviderList
                      watchProviders={movie.watch_providers}
                      movieId={movie.id}
                    />
                  </>
                )}

                <h2 className="mb-1 mt-4 text-lg font-bold text-gray-50">
                  Description
                </h2>
                <p className="text-base leading-snug text-gray-200">
                  {movie.overview}
                </p>

                <h2 className="mb-1 mt-4 text-lg font-bold text-gray-50">
                  Cast
                </h2>
                <ActorList actors={movie.cast} movieId={movie.id} />
              </div>
            </div>
          </div>
        </div>
      </SwipeCard>
    </>
  );
}

function GenreList({ genres }: { genres: Movie["genres"] }) {
  return (
    <ScrollShadow
      orientation="horizontal"
      hideScrollBar
      className="cancel-card-swipe mx-6 flex gap-2"
    >
      {genres.map((genre) => {
        return (
          <Genre key={genre.id} id={genre.id}>
            {genre.name}
          </Genre>
        );
      })}
    </ScrollShadow>
  );
}

function ActorList({
  movieId,
  actors,
}: {
  movieId: number;
  actors: Movie["cast"];
}) {
  return (
    <ScrollShadow
      orientation="horizontal"
      hideScrollBar
      className="flex items-start gap-4"
    >
      {actors.map((actor) => {
        return (
          <Actor
            key={movieId.toString() + actor.cast_id.toString()}
            name={actor.name}
            role={actor.character}
            imageSrc={actor.profile_path}
          />
        );
      })}
    </ScrollShadow>
  );
}

function WatchProviderList({
  movieId,
  watchProviders,
}: {
  movieId: number;
  watchProviders: NonNullable<Movie["watch_providers"]>;
}) {
  return (
    <ScrollShadow
      orientation="horizontal"
      hideScrollBar
      className="flex items-start gap-2"
    >
      {watchProviders.flatrate?.map((watchProvider) => {
        return (
          <Link
            href={watchProviders.link}
            isExternal
            key={movieId.toString() + watchProvider.provider_id.toString()}
          >
            <LogoImage
              src={watchProvider.logo_path}
              name={watchProvider.provider_name}
            />
          </Link>
        );
      })}
    </ScrollShadow>
  );
}
