import { getRegions, getLanguages } from "@/app/lib/tmdbConfiguration";
import { StepForm } from "@/app/components/StepForm";
import { GenreFormStep } from "./GenreFormStep";
import { WatchProviderFormStep } from "./WatchProviderFormStep";
import { LocalizationFormStep } from "./LocalizationFormStep";

export default async function Start({
  searchParams,
}: {
  searchParams: { lang: string; region: string };
}) {
  const languages = await getLanguages();
  const regions = await getRegions();

  languages.sort((a, b) => (a.english_name > b.english_name ? 1 : -1));
  regions.sort((a, b) => (a.english_name > b.english_name ? 1 : -1));

  const language = searchParams.lang;
  const region = searchParams.region;

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="h-full w-full p-8 md:max-h-[40rem] md:max-w-screen-md">
        <StepForm action={undefined} stepCount={3} validationSteps={[]}>
          <LocalizationFormStep
            index={0}
            languages={languages}
            regions={regions}
          />
          <WatchProviderFormStep
            index={1}
            language={language}
            region={region}
          />
          <GenreFormStep index={2} language={language} />
        </StepForm>
      </div>
    </main>
  );
}
