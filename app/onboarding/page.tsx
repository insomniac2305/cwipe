import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { auth } from "@/app/lib/auth";
import {
  getRegions,
  getLanguages,
  getWatchProviders,
  getGenres,
} from "@/app/lib/tmdbActions";
import { verifyOnboardingComplete } from "@/app/onboarding/lib/actions";
import { StartForm } from "@/app/onboarding/components/StartForm";

export default async function Onboarding({
  searchParams,
}: {
  searchParams: Promise<{
    lang?: string;
    region?: string;
    skip?: string;
    callbackUrl?: string;
  }>;
}) {
  const { lang, region, skip, callbackUrl } = await searchParams;
  const shouldSkip = skip === "true";

  if (shouldSkip) {
    const session = await auth();
    const userId = session?.user?.id;
    const isOnboardingComplete = await verifyOnboardingComplete(userId);
    if (isOnboardingComplete) redirect(callbackUrl || DEFAULT_LOGIN_REDIRECT);
  }

  const languages = await getLanguages();
  const regions = await getRegions();

  languages.sort((a, b) => (a.english_name > b.english_name ? 1 : -1));
  regions.sort((a, b) => (a.english_name > b.english_name ? 1 : -1));

  const watchProviders = await getWatchProviders(lang || "en", region || "DE");
  const genres = await getGenres(lang || "en");

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="h-full w-full p-8 md:max-h-[40rem] md:max-w-screen-md">
        <StartForm
          languages={languages}
          regions={regions}
          watchProviders={watchProviders}
          genres={genres}
          callbackUrl={callbackUrl || DEFAULT_LOGIN_REDIRECT}
        />
      </div>
    </main>
  );
}
