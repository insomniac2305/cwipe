import { Genre } from "@/app/lib/definitions";
import GenreCheckbox from "@/app/start/GenreCheckbox";
import { CheckboxGroup } from "@nextui-org/react";

export async function GenreCheckboxGroup({ genres }: { genres: Genre[] }) {
  return (
    <CheckboxGroup
      label="Select your favorite movie Genres"
      orientation="horizontal"
      className="items-center gap-4"
      classNames={{ wrapper: "justify-center gap-4" }}
    >
      {genres.map((genre) => (
        <GenreCheckbox key={genre.id} genre={genre} />
      ))}
    </CheckboxGroup>
  );
}
