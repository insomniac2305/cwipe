"use client";
import { Button } from "@nextui-org/react";
import {
  HiArrowUturnLeft,
  HiHandThumbDown,
  HiHandThumbUp,
  HiInformationCircle,
} from "react-icons/hi2";

export function SwipeButtonRow({
  onLike,
  onDislike,
  onUndoRating,
  onToggleInfo,
  isDisabled,
}: {
  onLike: () => void;
  onDislike: () => void;
  onUndoRating: () => void;
  onToggleInfo: () => void;
  isDisabled?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-evenly bg-default-50 p-4 pt-2 xl:w-96 xl:justify-around xl:rounded-full xl:py-3 xl:shadow-xl">
      <Button
        className="text-xl"
        aria-label="Undo"
        radius="full"
        variant="flat"
        onPress={onUndoRating}
        isIconOnly
        isDisabled={isDisabled}
      >
        <HiArrowUturnLeft />
      </Button>
      <Button
        className="text-3xl"
        size="lg"
        aria-label="Dislike"
        radius="full"
        color="secondary"
        onPress={onDislike}
        isIconOnly
        isDisabled={isDisabled}
      >
        <HiHandThumbDown />
      </Button>
      <Button
        className="text-3xl"
        size="lg"
        aria-label="Like"
        radius="full"
        color="primary"
        onPress={onLike}
        isIconOnly
        isDisabled={isDisabled}
      >
        <HiHandThumbUp />
      </Button>
      <Button
        className="text-xl"
        aria-label="More Info"
        radius="full"
        variant="flat"
        onPress={onToggleInfo}
        isIconOnly
        isDisabled={isDisabled}
      >
        <HiInformationCircle />
      </Button>
    </div>
  );
}
