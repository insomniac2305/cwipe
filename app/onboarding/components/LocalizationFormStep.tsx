import { useContext } from "react";
import { Language, Region } from "@/app/lib/definitions";
import {
  FormStep,
  StepFormContext,
} from "@/app/onboarding/components/StepForm";
import { RegionSelect } from "@/app/onboarding/components/RegionSelect";
import { LanguageSelect } from "@/app/onboarding/components/LanguageSelect";

export function LocalizationFormStep({
  index,
  languages,
  regions,
}: {
  index: number;
  languages: Language[];
  regions: Region[];
}) {
  const { validationErrors } = useContext(StepFormContext);

  return (
    <FormStep index={index}>
      <h1 className="p-1 font-heading text-2xl">Localization</h1>
      <div className="flex w-full flex-wrap justify-center gap-4 p-1">
        <div className="min-w-48 grow basis-48">
          <LanguageSelect
            languages={languages}
            errors={validationErrors?.fieldErrors.language}
          ></LanguageSelect>
        </div>
        <div className="min-w-48 grow basis-48">
          <RegionSelect
            regions={regions}
            errors={validationErrors?.fieldErrors.region}
          ></RegionSelect>
        </div>
      </div>
    </FormStep>
  );
}
