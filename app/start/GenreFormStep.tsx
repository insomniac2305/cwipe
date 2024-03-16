import { useContext } from "react";
import { GenreCheckboxGroup } from "@/app/start/GenreCheckboxGroup";
import { FormStep, StepFormContext } from "@/app/components/StepForm";
import { ScrollShadow } from "@nextui-org/react";
import { Genre } from "@/app/lib/definitions";

export function GenreFormStep({
  index,
  genres,
}: {
  index: number;
  genres: Genre[];
}) {
  const { validationErrors } = useContext(StepFormContext);

  return (
    <FormStep index={index}>
      <h1 className="font-heading text-2xl">Genres</h1>
      <ScrollShadow className="h-[calc(100%-2rem)]">
        <GenreCheckboxGroup
          genres={genres}
          errors={validationErrors?.fieldErrors.genres}
        />
      </ScrollShadow>
    </FormStep>
  );
}
