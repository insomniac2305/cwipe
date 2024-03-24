import { RegionSelect } from "./RegionSelect";
import { LanguageSelect } from "./LanguageSelect";
import { FormStep, StepFormContext } from "@/app/components/StepForm";
import { Language, Region } from "@/app/lib/definitions";
import { useContext } from "react";

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
