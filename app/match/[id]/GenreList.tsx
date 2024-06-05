import { Movie } from "@/app/lib/definitions";
import { ScrollShadow } from "@nextui-org/react";
import { Genre } from "@/app/components/Genre";

export function GenreList({ genres }: { genres: Movie["genres"] }) {
  return (
    <ScrollShadow
      orientation="horizontal"
      className="cancel-card-swipe mx-6 flex gap-2 scrollbar-hide hover:scrollbar-default xl:flex-wrap"
    >
      {genres.map((genre) => {
        return (
          <Genre key={genre.id} id={genre.id} isResponsive>
            {genre.name}
          </Genre>
        );
      })}
    </ScrollShadow>
  );
}
