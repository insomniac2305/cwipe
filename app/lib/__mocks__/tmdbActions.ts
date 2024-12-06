"use server";

import { vi } from "vitest";

export const getLanguages = vi.fn().mockResolvedValue([
  {
    iso_639_1: "DE",
    english_name: "German",
    name: "Deutsch",
  },
]);

export const getRegions = vi.fn().mockResolvedValue([
  {
    iso_3166_1: "DE",
    english_name: "Germany",
    native_name: "Deutschland",
  },
]);

export const getGenres = vi.fn().mockResolvedValue([
  {
    id: 1,
    name: "One",
  },
]);

export const getWatchProviders = vi.fn().mockResolvedValue([
  {
    display_priority: 1,
    logo_path: "/logo.jpg",
    provider_name: "One",
    provider_id: 1,
  },
]);
