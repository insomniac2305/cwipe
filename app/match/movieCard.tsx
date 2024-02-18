import {
  DiscoverMovies,
  SwipeCardRef,
  SwipeDirection,
} from "@/app/lib/definitions";
import SwipeCard from "@/app/match/swipeCard";
import { Button, Chip, Divider, ScrollShadow } from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import {
  HiArrowUturnLeft,
  HiHandThumbDown,
  HiHandThumbUp,
  HiInformationCircle,
  HiMiniStar,
} from "react-icons/hi2";

export default function MovieCard({
  movie,
  zIndex,
  isLiked,
  onRateMovie,
  onUndoRating,
}: {
  movie: DiscoverMovies["results"][number];
  zIndex: number;
  isLiked?: boolean;
  onRateMovie: (
    movie: DiscoverMovies["results"][number],
    isLiked: boolean,
  ) => void;
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
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.poster_path}`}
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
            <ScrollShadow
              orientation="horizontal"
              hideScrollBar
              className="cancel-card-swipe mx-6 flex gap-2"
            >
              <Chip variant="flat" size="sm" color="default">
                Action
              </Chip>
              <Chip variant="flat" size="sm" color="default">
                Science Fiction
              </Chip>
            </ScrollShadow>
            <div className="flex gap-2 px-6 text-sm text-gray-200">
              <div>
                <HiMiniStar className="relative top-[1px] inline align-baseline" />{" "}
                {movie.vote_average}
              </div>
              <Divider orientation="vertical" />
              {movie.release_date.slice(0, 4)}
              <Divider orientation="vertical" />
              1h 45m
            </div>
            <div
              className={clsx(
                "h-1/2 bg-gray-900 px-6 pb-6",
                isInfoVisible && "overflow-y-auto",
              )}
            >
              <h1
                className={clsx(
                  "mt-2 text-lg font-bold text-gray-50 opacity-0 transition-opacity duration-300",
                  isInfoVisible && "opacity-100",
                )}
              >
                Description
              </h1>
              <p
                className={clsx(
                  "text-base leading-snug text-gray-200 opacity-0 transition-opacity duration-300",
                  isInfoVisible && "opacity-100",
                )}
              >
                {movie.overview}
              </p>
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
