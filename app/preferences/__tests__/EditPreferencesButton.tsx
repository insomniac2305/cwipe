import { mockUserPreferences } from "@/app/preferences/lib/__mocks__/actions";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { getUserPreferences } from "@/app/preferences/lib/actions";
import { EditPreferencesButton } from "@/app/preferences/components/EditPreferencesButton";

vi.mock("@/app/preferences/lib/actions");

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
