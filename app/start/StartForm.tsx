"use client";

import { StepForm } from "@/app/components/StepForm";
import { GenreFormStep } from "./GenreFormStep";
import { WatchProviderFormStep } from "./WatchProviderFormStep";
import { LocalizationFormStep } from "./LocalizationFormStep";
import { LocalizationSchema } from "@/app/start/validation";
import { Genre, Language, Region, WatchProvider } from "@/app/lib/definitions";

export function StartForm({
  languages,
  regions,
  genres,
  watchProviders,
}: {
  languages: Language[];
  regions: Region[];
  watchProviders: WatchProvider[];
  genres: Genre[];
}) {
  return (
    <StepForm
      action={undefined}
      stepCount={3}
      validationSteps={[LocalizationSchema]}
    >
      <LocalizationFormStep index={0} languages={languages} regions={regions} />
      <WatchProviderFormStep index={1} watchProviders={watchProviders} />
      <GenreFormStep index={2} genres={genres} />
    </StepForm>
  );
}
