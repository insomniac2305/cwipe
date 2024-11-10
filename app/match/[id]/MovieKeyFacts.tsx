import { Divider } from "@nextui-org/react";
import clsx from "clsx";
import { HiMiniStar } from "react-icons/hi2";

export function MovieKeyFacts({
  voteAverage,
  releaseDate,
  runtime,
  shouldScale,
}: {
  voteAverage: number;
  releaseDate: string;
  runtime: number;
  shouldScale?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex content-stretch justify-start gap-2 text-sm text-gray-200",
        shouldScale && "xl:text-base",
      )}
    >
      <div>
        <HiMiniStar
          className={clsx(
            "relative top-[1px] inline align-baseline",
            shouldScale && "xl:top-[2px] xl:text-lg",
          )}
        />{" "}
        {voteAverage.toFixed(1)}
      </div>
      <Divider orientation="vertical" />
      {releaseDate.slice(0, 4)}
      <Divider orientation="vertical" />
      {`${Math.floor(runtime / 60)}h ${runtime % 60}m`}
    </div>
  );
}
