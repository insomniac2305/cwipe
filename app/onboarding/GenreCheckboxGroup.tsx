import { Genre } from "@/app/lib/definitions";
import GenreCheckbox from "@/app/onboarding/GenreCheckbox";
import { CheckboxGroup } from "@nextui-org/react";
import clsx from "clsx";
import { memo } from "react";

export const GenreCheckboxGroup = memo(function GenreCheckboxGroup({
  genres,
  errors,
}: {
  genres: Genre[];
  errors?: string[];
}) {
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
    >
      {genres.map((genre) => (
        <GenreCheckbox key={genre.id} genre={genre} />
      ))}
    </CheckboxGroup>
  );
});
