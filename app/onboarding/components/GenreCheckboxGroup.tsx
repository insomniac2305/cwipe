import clsx from "clsx";
import { memo } from "react";
import { useSearchParams } from "next/navigation";
import { CheckboxGroup } from "@heroui/react";
import { Genre } from "@/app/lib/definitions";
import GenreCheckbox from "@/app/onboarding/components/GenreCheckbox";

export const GenreCheckboxGroup = memo(function GenreCheckboxGroup({
  genres,
  errors,
}: {
  genres: Genre[];
  errors?: string[];
}) {
  const searchParams = useSearchParams();
  const genresParam = searchParams.get("genres");
  const genreIds = genresParam?.split(",");

  return (
    <CheckboxGroup
      name="genres"
      label="Select your favorite movie genres"
      orientation="horizontal"
      className="gap-4"
      classNames={{
        wrapper: "justify-center gap-4",
        label: clsx("w-full", !!errors && "text-danger"),
        errorMessage: "w-full",
      }}
      isInvalid={!!errors}
      errorMessage={clsx(!!errors && "Please select at least one genre")}
      defaultValue={genreIds}
    >
      {genres.map((genre) => (
        <GenreCheckbox key={genre.id} genre={genre} />
      ))}
    </CheckboxGroup>
  );
});
