import { RegionSelect } from "./RegionSelect";
import { LanguageSelect } from "./LanguageSelect";
import { FormStep } from "@/app/components/StepForm";
import { Language, Region } from "@/app/lib/definitions";

export function LocalizationFormStep({
  index,
  languages,
  regions,
}: {
  index: number;
  languages: Language[];
  regions: Region[];
}) {
  return (
    <FormStep index={index}>
      <h1 className="font-heading text-2xl">Localization</h1>
      <div className="flex w-full flex-wrap justify-center gap-4">
        <div className="min-w-48 grow basis-48">
          <LanguageSelect languages={languages}></LanguageSelect>
        </div>
        <div className="min-w-48 grow basis-48">
          <RegionSelect regions={regions}></RegionSelect>
        </div>
      </div>
    </FormStep>
  );
}
