import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { getUserPreferences } from "@/app/preferences/lib/actions";
import { EditPreferencesButton } from "@/app/preferences/components/EditPreferencesButton";

vi.mock("@/app/preferences/lib/actions");

const mockUserPreferences = {
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

describe("Preferences", () => {
  it("renders link to onboarding page", async () => {
    vi.mocked(getUserPreferences).mockResolvedValueOnce(mockUserPreferences);

    const page = await EditPreferencesButton();
    render(page);

    const link = screen.getByRole("button", { name: /edit preferences/i });

    expect(link).toHaveAttribute("href", expect.stringMatching(/onboarding/i));
  });

  it("rendered link contains current preferences as search params", async () => {
    vi.mocked(getUserPreferences).mockResolvedValueOnce(mockUserPreferences);

    const page = await EditPreferencesButton();
    render(page);

    const link = screen.getByRole("button", { name: /edit preferences/i });

    expect(link).toHaveAttribute("href", expect.stringMatching(/lang=DE/i));
    expect(link).toHaveAttribute("href", expect.stringMatching(/region=DE/i));
    expect(link).toHaveAttribute(
      "href",
      expect.stringMatching(/providers=1%2C2%2C3/i),
    );
    expect(link).toHaveAttribute(
      "href",
      expect.stringMatching(/genres=4%2C5%2C6/i),
    );
  });
});
