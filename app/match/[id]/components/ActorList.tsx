import { ScrollShadow } from "@heroui/scroll-shadow";
import { Movie } from "@/app/lib/definitions";
import { User } from "@/app/components/User";

export function ActorList({ actors }: { actors: Movie["cast"] }) {
  return (
    <ScrollShadow
      orientation="horizontal"
      className="flex items-start gap-4 pb-[15px] scrollbar-hide hover:pb-0 hover:scrollbar-default"
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
