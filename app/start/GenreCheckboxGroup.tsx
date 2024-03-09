import { getGenres } from "@/app/lib/tmdbConfiguration";
import GenreCheckbox from "@/app/start/GenreCheckbox";
import { CheckboxGroup } from "@nextui-org/react";

export async function GenreCheckboxGroup({ language }: { language: string }) {
  const genres = await getGenres(language);
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
