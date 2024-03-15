import { Suspense } from "react";
import { GenreCheckboxGroup } from "@/app/start/GenreCheckboxGroup";
import { FormStep } from "@/app/components/StepForm";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ScrollShadow } from "@nextui-org/react";

export function GenreFormStep({
  index,
  language,
}: {
  index: number;
  language: string;
}) {
  return (
    <FormStep index={index}>
      <h1 className="font-heading text-2xl">Genres</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <ScrollShadow className="h-[calc(100%-2rem)]">
          <GenreCheckboxGroup language={language || "en"} />
        </ScrollShadow>
      </Suspense>
    </FormStep>
  );
}
