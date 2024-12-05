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
        logo_path: "",
        provider_name: "",
        provider_id: 1,
      },
      {
        display_priority: 0,
        logo_path: "",
        provider_name: "",
        provider_id: 2,
      },
      {
        display_priority: 0,
        logo_path: "",
        provider_name: "",
        provider_id: 3,
      },
    ],
    genres: [
      {
        id: 4,
        name: "",
      },
      {
        id: 5,
        name: "",
      },
      {
        id: 6,
        name: "",
      },
    ],
  },
};
