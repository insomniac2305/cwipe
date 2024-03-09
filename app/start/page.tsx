import { getRegions, getLanguages } from "@/app/lib/tmdbConfiguration";
import { RegionSelect } from "./RegionSelect";
import { LanguageSelect } from "./LanguageSelect";
import { WatchProviderCheckboxGroup } from "./WatchProviderCheckboxGroup";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";
import { GenreCheckboxGroup } from "@/app/start/GenreCheckboxGroup";

function LoadingSkeleton() {
  return (
    <>
      <div className="flex items-center">
        <Skeleton className="h-3 w-64 rounded-full" />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {[...Array(12)].map((e, index) => (
          <div key={index} className="flex w-16 flex-col items-center gap-2">
            <Skeleton className="size-16 rounded-2xl" />
            <Skeleton className="h-2 w-3/4 rounded-full" />
          </div>
        ))}
      </div>
    </>
  );
}

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
    <main className="flex min-h-dvh flex-col items-center justify-center gap-2 p-8">
      <h1 className="font-heading text-2xl">Localization</h1>
      <div className="flex w-full flex-wrap justify-center gap-4">
        <div className="min-w-48 grow basis-48">
          <LanguageSelect languages={languages}></LanguageSelect>
        </div>
        <div className="min-w-48 grow basis-48">
          <RegionSelect regions={regions}></RegionSelect>
        </div>
      </div>
      <h1 className="mt-8 font-heading text-2xl">Watch Providers</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <WatchProviderCheckboxGroup
          language={language || "en"}
          region={region || "DE"}
        />
      </Suspense>
      <h1 className="mt-8 font-heading text-2xl">Genres</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <GenreCheckboxGroup language={language || "en"} />
      </Suspense>
    </main>
  );
}
