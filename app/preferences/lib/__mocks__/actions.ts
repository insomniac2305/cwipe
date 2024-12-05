import { vi } from "vitest";

export const getUserPreferences = vi.fn();

export const mockUserPreferences = {
  data: {
    language: {
      iso_639_1: "DE",
      english_name: "German",
      name: "Deutsch",
    },
    region: {
      iso_3166_1: "DE",
      english_name: "Germany",
      native_name: "Deutschland",
    },
    providers: [
      {
        display_priority: 0,
        logo_path: "/provider-1.jpg",
        provider_name: "Provider 1",
        provider_id: 1,
      },
      {
        display_priority: 0,
        logo_path: "/provider-2.jpg",
        provider_name: "Provider 2",
        provider_id: 2,
      },
      {
        display_priority: 0,
        logo_path: "/provider-3.jpg",
        provider_name: "Provider 3",
        provider_id: 3,
      },
    ],
    genres: [
      {
        id: 4,
        name: "Genre 1",
      },
      {
        id: 5,
        name: "Genre 2",
      },
      {
        id: 6,
        name: "Genre 3",
      },
    ],
  },
};

export const mockUserPreferencesError = {
  error: { message: "Error" },
};
