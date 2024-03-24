"use client";

import { StepForm } from "@/app/components/StepForm";
import { GenreFormStep } from "./GenreFormStep";
import { WatchProviderFormStep } from "./WatchProviderFormStep";
import { LocalizationFormStep } from "./LocalizationFormStep";
import {
  GenresSchema,
  LocalizationSchema,
  WatchProvidersSchema,
} from "@/app/start/validation";
import { Genre, Language, Region, WatchProvider } from "@/app/lib/definitions";
import { submitUserOnboarding } from "@/app/start/actions";

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
      action={submitUserOnboarding}
      stepCount={3}
      validationSteps={[LocalizationSchema, WatchProvidersSchema, GenresSchema]}
    >
      <LocalizationFormStep index={0} languages={languages} regions={regions} />
      <WatchProviderFormStep index={1} watchProviders={watchProviders} />
      <GenreFormStep index={2} genres={genres} />
    </StepForm>
  );
}
