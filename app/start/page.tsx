import {
  getRegions,
  getLanguages,
  getWatchProviders,
  getGenres,
} from "@/app/lib/tmdbConfiguration";
import { StartForm } from "./StartForm";

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

  const watchProviders = await getWatchProviders(
    language || "en",
    region || "DE",
  );
  const genres = await getGenres(language || "en");

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="h-full w-full p-8 md:max-h-[40rem] md:max-w-screen-md">
        <StartForm
          languages={languages}
          regions={regions}
          watchProviders={watchProviders}
          genres={genres}
        />
      </div>
    </main>
  );
}
