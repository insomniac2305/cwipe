import { Movie, SwipeCardRef, SwipeDirection } from "@/app/lib/definitions";
import { getInitials } from "@/app/lib/util";
import SwipeCard from "@/app/match/swipeCard";
import {
  Image,
  Button,
  Divider,
  ScrollShadow,
  User,
  Link,
} from "@nextui-org/react";
import clsx from "clsx";
import NextImage from "next/image";

import { useEffect, useRef, useState } from "react";
import {
  HiArrowUturnLeft,
  HiHandThumbDown,
  HiHandThumbUp,
  HiInformationCircle,
  HiMiniStar,
} from "react-icons/hi2";
import { Genre } from "@/app/components/Genre";

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

function LogoImage({ src, name }: { src: string; name: string }) {
  return (
    <Image
      as={NextImage}
      src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w45${src}`}
      width={45}
      height={45}
      className="object-cover"
      alt={name}
      draggable={false}
    />
  );
}

export default function MovieCard({
  movie,
  zIndex,
  isLiked,
  onRateMovie,
  onUndoRating,
}: {
  movie: Movie;
  zIndex: number;
  isLiked?: boolean;
  onRateMovie: (movie: Movie, isLiked: boolean) => void;
  onUndoRating: () => void;
}) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const swipeRef = useRef<SwipeCardRef>(null);
  const simulateSwipe = (direction: SwipeDirection) => {
    swipeRef.current?.swipe(direction);
  };

  const toggleInfo = () => {
    setIsInfoVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (isLiked === undefined) {
      swipeRef.current?.undoSwipe();
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
        <div className="relative h-[calc(100%-5rem)] w-full">
          <NextImage
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w780${movie.poster_path}`}
            fill={true}
            className="object-cover opacity-0 transition-opacity duration-500"
            onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
            alt={movie.title}
            draggable={false}
          />
        </div>
        <div
          className={clsx(
            "absolute top-0 h-full w-full p-0 transition-transform duration-300",
            isInfoVisible && "-translate-y-1/2",
          )}
        >
          <div className="absolute bottom-0 h-64 w-full bg-gradient-to-t from-gray-900 from-40% via-gray-900/90 via-70%"></div>
          <div className="absolute top-[calc(100%-12rem)] mt-6 flex h-full w-full flex-col gap-2 transition-all">
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

                    <ScrollShadow
                      orientation="horizontal"
                      hideScrollBar
                      className="flex items-start gap-2"
                    >
                      {movie.watch_providers.flatrate?.map((watchProvider) => {
                        return (
                          <Link
                            href={movie.watch_providers?.link}
                            isExternal
                            key={
                              movie.id.toString() +
                              watchProvider.provider_id.toString()
                            }
                          >
                            <LogoImage
                              src={watchProvider.logo_path}
                              name={watchProvider.provider_name}
                            />
                          </Link>
                        );
                      })}
                    </ScrollShadow>
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
                <ScrollShadow
                  orientation="horizontal"
                  hideScrollBar
                  className="flex items-start gap-4"
                >
                  {movie.cast.map((actor) => {
                    return (
                      <User
                        key={movie.id.toString() + actor.cast_id.toString()}
                        avatarProps={{
                          className: "h-20 w-20",
                          classNames: {
                            name: "text-3xl font-medium",
                          },
                          getInitials: getInitials,
                          src:
                            actor.profile_path &&
                            `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w185/${actor.profile_path}`,
                        }}
                        name={actor.name}
                        description={actor.character}
                        classNames={{
                          base: "flex flex-col items-center",
                          wrapper: "text-center",
                          description:
                            "w-20 overflow-hidden text-ellipsis whitespace-nowrap",
                        }}
                      />
                    );
                  })}
                </ScrollShadow>
              </div>
            </div>
          </div>
        </div>
      </SwipeCard>
      <div
        className={clsx(
          "absolute bottom-0 flex w-full items-center justify-evenly bg-gray-900 p-4",
          isLiked !== undefined && "hidden",
        )}
        style={{ zIndex: zIndex }}
      >
        <Button
          className="text-xl"
          aria-label="Undo"
          radius="full"
          variant="flat"
          onPress={onUndoRating}
          isIconOnly
        >
          <HiArrowUturnLeft />
        </Button>
        <Button
          className="text-3xl"
          size="lg"
          aria-label="Dislike"
          radius="full"
          color="secondary"
          onPress={simulateSwipe.bind(null, "left")}
          isIconOnly
        >
          <HiHandThumbDown />
        </Button>
        <Button
          className="text-3xl"
          size="lg"
          aria-label="Like"
          radius="full"
          color="primary"
          onPress={simulateSwipe.bind(null, "right")}
          isIconOnly
        >
          <HiHandThumbUp />
        </Button>
        <Button
          className="text-xl"
          aria-label="More Info"
          radius="full"
          variant="flat"
          onPress={toggleInfo}
          isIconOnly
        >
          <HiInformationCircle />
        </Button>
      </div>
    </>
  );
}
