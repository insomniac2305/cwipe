import {
  mockUserPreferences,
  mockUserPreferencesError,
} from "@/app/preferences/lib/__mocks__/actions";
import "@/app/__mocks__/Image";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { getUserPreferences } from "@/app/preferences/lib/actions";
import { UserPreferences } from "@/app/preferences/components/UserPreferences";

vi.mock("@/app/preferences/lib/actions");
vi.mock("@/app/components/Genre");

describe("Preferences", () => {
  beforeEach(async () => {
    vi.mocked(getUserPreferences).mockResolvedValueOnce(mockUserPreferences);

    const page = await UserPreferences();
    render(page);
  });
  it("renders user language", async () => {
    const language = screen.getByText(mockUserPreferences.data.language.name);

    expect(language).toBeInTheDocument();
  });

  it("renders user region", async () => {
    const region = screen.getByText(
      mockUserPreferences.data.region.native_name,
    );

    expect(region).toBeInTheDocument();
  });

  it("renders user watch providers", async () => {
    const providers = screen.getAllByRole("img", { name: /provider/i });
    const actualProviderLogoPaths = providers.map((provider) =>
      provider.getAttribute("src"),
    );
    const mockProviderLogoPathPatterns = mockUserPreferences.data.providers.map(
      (provider) => expect.stringMatching(new RegExp(provider.logo_path)),
    );

    expect(actualProviderLogoPaths).toEqual(mockProviderLogoPathPatterns);
  });

  it("renders user genres", async () => {
    const genres = [
      screen.getByText(mockUserPreferences.data.genres[0].name),
      screen.getByText(mockUserPreferences.data.genres[1].name),
      screen.getByText(mockUserPreferences.data.genres[2].name),
    ];

    genres.forEach((genre) => {
      expect(genre).toBeInTheDocument();
    });
  });
});

describe("Preferences (error)", () => {
  it("renders error message when no data returned", async () => {
    vi.mocked(getUserPreferences).mockResolvedValueOnce(
      mockUserPreferencesError,
    );

    const page = await UserPreferences();
    render(page);

    const error = screen.getByText(/error/i);

    expect(error).toBeInTheDocument();
  });
});
