"use client";

import { Genre, Language, Region, WatchProvider } from "@/app/lib/definitions";
import { submitUserOnboarding } from "@/app/onboarding/lib/actions";
import {
  GenresSchema,
  LocalizationSchema,
  WatchProvidersSchema,
} from "@/app/onboarding/lib/validation";
import { StepForm } from "@/app/onboarding/components/StepForm";
import { GenreFormStep } from "@/app/onboarding/components/GenreFormStep";
import { WatchProviderFormStep } from "@/app/onboarding/components/WatchProviderFormStep";
import { LocalizationFormStep } from "@/app/onboarding/components/LocalizationFormStep";

export function StartForm({
  languages,
  regions,
  genres,
  watchProviders,
  callbackUrl,
}: {
  languages: Language[];
  regions: Region[];
  watchProviders: WatchProvider[];
  genres: Genre[];
  callbackUrl?: string;
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
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
    </StepForm>
  );
}
