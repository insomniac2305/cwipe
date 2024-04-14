import { Movie } from "@/app/lib/definitions";
import { ScrollShadow } from "@nextui-org/react";
import { User } from "@/app/components/User";

export function ActorList({ actors }: { actors: Movie["cast"] }) {
  return (
    <ScrollShadow
      orientation="horizontal"
      hideScrollBar
      className="flex items-start gap-4"
    >
      {actors.map((actor) => {
        return (
          <User
            key={actor.credit_id}
            name={actor.name}
            description={actor.character}
            imageSrc={
              actor.profile_path &&
              `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w185/${actor.profile_path}`
            }
          />
        );
      })}
    </ScrollShadow>
  );
}
