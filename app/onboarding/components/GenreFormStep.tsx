import { useContext } from "react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Genre } from "@/app/lib/definitions";
import {
  FormStep,
  StepFormContext,
} from "@/app/onboarding/components/StepForm";
import { GenreCheckboxGroup } from "@/app/onboarding/components/GenreCheckboxGroup";

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
