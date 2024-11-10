import React from "react";
import { Avatar, AvatarGroup, Link } from "@nextui-org/react";
import { Movie } from "@/app/lib/definitions";
import NextImage from "next/image";
import { MovieKeyFacts } from "@/app/match/[id]/MovieKeyFacts";

export async function MatchListItem({ movie }: { movie: Movie }) {
  return (
    <li className="flex w-full min-w-80 gap-2 rounded-2xl bg-content2 shadow-lg">
      <Link href={movie.watch_providers?.link} isExternal className="shrink-0">
        <NextImage
          height={192}
          width={144}
          className="h-48 w-36 rounded-l-2xl object-cover"
          src={
            process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL +
            "/original" +
            movie.poster_path
          }
          alt={movie.title}
          draggable={false}
        />
      </Link>
      <div className="flex h-full flex-col gap-2 px-2 py-4">
        <h2 className="line-clamp-2 overflow-ellipsis font-heading text-lg">
          {movie.title}
        </h2>
        <MovieKeyFacts
          voteAverage={movie.vote_average}
          releaseDate={movie.release_date}
          runtime={movie.runtime}
        />
        <div className="flex justify-start">
          <AvatarGroup max={5} isGrid className="gap-2">
            {movie.watch_providers?.flatrate?.map((watchProvider) => (
              <Avatar
                key={watchProvider.provider_id + movie.id}
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${watchProvider.logo_path}`}
                name={watchProvider.provider_name}
                radius="md"
              />
            ))}
          </AvatarGroup>
        </div>
      </div>
    </li>
  );
}
