import React from "react";
import { Link } from "@nextui-org/react";
import { Movie } from "@/app/lib/definitions";
import NextImage from "next/image";
import { MovieKeyFacts } from "@/app/match/[id]/MovieKeyFacts";
import { GenreList } from "@/app/match/[id]/GenreList";
import { WatchProviderList } from "@/app/match/[id]/WatchProviderList";

export function MatchListItem({ movie }: { movie: Movie }) {
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
      <div className="flex h-full w-full flex-col gap-3 overflow-hidden px-2 py-3">
        <h2 className="-mb-2 line-clamp-2 overflow-ellipsis font-heading text-lg">
          {movie.title}
        </h2>
        <MovieKeyFacts
          voteAverage={movie.vote_average}
          releaseDate={movie.release_date}
          runtime={movie.runtime}
        />
        <GenreList
          genres={movie.genres}
          isResponsive={false}
          hasScrollbarOnHover={false}
        />
        {movie.watch_providers && (
          <WatchProviderList
            movieId={movie.id}
            watchProviders={movie.watch_providers}
            hasScrollbarOnHover={false}
          />
        )}
      </div>
    </li>
  );
}
