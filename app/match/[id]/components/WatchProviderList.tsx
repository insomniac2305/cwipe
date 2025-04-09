import clsx from "clsx";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Link } from "@heroui/link";
import { Movie } from "@/app/lib/definitions";
import { LogoImage } from "@/app/components/LogoImage";

export function WatchProviderList({
  movieId,
  watchProviders,
  hasScrollbarOnHover,
}: {
  movieId: number;
  watchProviders: NonNullable<Movie["watch_providers"]>;
  hasScrollbarOnHover: boolean;
}) {
  return (
    <ScrollShadow
      orientation="horizontal"
      className={clsx(
        "flex items-start gap-2 scrollbar-hide",
        hasScrollbarOnHover && "hover:scrollbar-default",
      )}
    >
      {watchProviders.flatrate?.map((watchProvider) => {
        return (
          <Link
            href={watchProviders.link}
            isExternal
            key={movieId.toString() + watchProvider.provider_id.toString()}
            className="shrink-0"
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
