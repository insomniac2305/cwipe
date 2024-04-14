import { Movie } from "@/app/lib/definitions";
import { ScrollShadow } from "@nextui-org/react";
import { Genre } from "@/app/components/Genre";

export function GenreList({ genres }: { genres: Movie["genres"] }) {
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
