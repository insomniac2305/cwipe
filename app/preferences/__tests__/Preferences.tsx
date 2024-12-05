import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { auth } from "@/app/lib/auth";
import Preferences from "@/app/preferences/page";

vi.mock("@/app/preferences/components/UserPreferences");
vi.mock("@/app/preferences/components/EditPreferencesButton");
vi.mock("@/app/components/GoogleSignInButton");
vi.mock("@/app/lib/auth");

describe("Preferences", () => {
  it("shows warning and Google sign in when user is temporary", async () => {
    vi.mocked(auth, { partial: true }).mockResolvedValueOnce({
      user: { name: "Test", image: "", isProviderAccount: false },
    });

    const page = await Preferences();
    render(page);

    const warning = screen.getByText(/temporary account/i);
    const button = screen.getByRole("button", { name: /sign in with google/i });

    expect(warning).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("shows no warning and Google sign in when user is a provider account", async () => {
    vi.mocked(auth, { partial: true }).mockResolvedValueOnce({
      user: { name: "Test", image: "", isProviderAccount: true },
    });

    const page = await Preferences();
    render(page);

    const warning = screen.queryByText(/temporary account/i);
    const button = screen.queryByRole("button", {
      name: /sign in with google/i,
    });

    expect(warning).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
});
