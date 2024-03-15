import { Suspense } from "react";
import { GenreCheckboxGroup } from "@/app/start/GenreCheckboxGroup";
import { FormStep } from "@/app/components/StepForm";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ScrollShadow } from "@nextui-org/react";
import { Genre } from "@/app/lib/definitions";

export function GenreFormStep({
  index,
  genres,
}: {
  index: number;
  genres: Genre[];
}) {
  return (
    <FormStep index={index}>
      <h1 className="font-heading text-2xl">Genres</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <ScrollShadow className="h-[calc(100%-2rem)]">
          <GenreCheckboxGroup genres={genres} />
        </ScrollShadow>
      </Suspense>
    </FormStep>
  );
}
