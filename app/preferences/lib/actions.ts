"use server";

import { sql } from "@vercel/postgres";
import { auth } from "@/app/lib/auth";
import {
  getGenres,
  getLanguages,
  getRegions,
  getWatchProviders,
} from "@/app/lib/tmdbActions";

export async function getUserPreferences() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { error: { message: "Unauthorized" } };

  try {
    const userPreferenceData = await sql`
        SELECT language, region, providers, genres
        FROM user_preferences
        WHERE user_id = ${userId}`;

    const {
      language: languageId,
      region: regionId,
      providers: providerIds,
      genres: genreIds,
    } = userPreferenceData.rows[0];

    const allLanguages = await getLanguages();
    const language = allLanguages.find((lang) => lang.iso_639_1 === languageId);

    const allRegions = await getRegions();
    const region = allRegions.find((reg) => reg.iso_3166_1 === regionId);

    const allProviders = await getWatchProviders(languageId, regionId);
    const providers = allProviders.filter((provider) =>
      providerIds.includes(provider.provider_id),
    );

    const allGenres = await getGenres(languageId);
    const genres = allGenres.filter((genre) => genreIds.includes(genre.id));

    const userPreferences = {
      language,
      region,
      providers,
      genres,
    };

    return { data: userPreferences };
  } catch (error) {
    return { error: { message: "Error loading user preferences" } };
  }
}
