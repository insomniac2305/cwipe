import { Movie } from "@/app/lib/definitions";
import { ScrollShadow, Link } from "@nextui-org/react";
import { LogoImage } from "@/app/components/LogoImage";

export function WatchProviderList({
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
