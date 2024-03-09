"use server";

import {
  Region,
  Language,
  WatchRegionsApi,
  WatchProvidersApi,
  WatchProvider,
} from "@/app/lib/definitions";

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TMDB_API_TOKEN,
  },
  next: { revalidate: 3600 },
};

export async function getLanguages(): Promise<Language[]> {
  const response = await fetch(
    process.env.TMDB_API_URL + "configuration/languages",
    fetchOptions,
  );
  if (response.ok) {
    return response.json();
  } else {
    return [
      {
        iso_639_1: "en",
        english_name: "English",
        name: "English",
      },
    ];
  }
}

export async function getRegions(): Promise<Region[]> {
  const response = await fetch(
    process.env.TMDB_API_URL + "watch/providers/regions",
    fetchOptions,
  );
  if (response.ok) {
    const regionData: WatchRegionsApi = await response.json();
    return regionData.results;
  } else {
    return [
      {
        iso_3166_1: "DE",
        english_name: "Germany",
        native_name: "Germany",
      },
    ];
  }
}

export async function getWatchProviders(
  language: string,
  region: string,
): Promise<WatchProvider[]> {
  const response = await fetch(
    `${process.env.TMDB_API_URL}watch/providers/movie?language=${language}&watch_region=${region}`,
    fetchOptions,
  );
  if (response.ok) {
    const watchProvidersData: WatchProvidersApi = await response.json();

    const results = watchProvidersData.results.map((provider) => ({
      display_priority: provider.display_priority,
      logo_path: provider.logo_path,
      provider_name: provider.provider_name,
      provider_id: provider.provider_id,
    }));

    return results;
  } else {
    throw new Error("Error while fetching watch providers");
  }
}
