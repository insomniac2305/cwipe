import clsx from "clsx";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Movie } from "@/app/lib/definitions";
import { Genre } from "@/app/components/Genre";

export function GenreList({
  genres,
  isResponsive,
  hasScrollbarOnHover,
}: {
  genres: Movie["genres"];
  isResponsive: boolean;
  hasScrollbarOnHover: boolean;
}) {
  return (
    <ScrollShadow
      orientation="horizontal"
      className={clsx(
        "cancel-card-swipe flex gap-2 scrollbar-hide",
        isResponsive && "xl:flex-wrap",
        hasScrollbarOnHover && "xl:hover:scrollbar-default",
      )}
    >
      {genres.map((genre) => {
        return (
          <Genre key={genre.id} id={genre.id} isResponsive={isResponsive}>
            {genre.name}
          </Genre>
        );
      })}
    </ScrollShadow>
  );
}
