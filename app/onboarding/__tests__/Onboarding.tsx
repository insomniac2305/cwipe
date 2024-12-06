import { auth } from "@/app/lib/auth";
import { verifyOnboardingComplete } from "@/app/onboarding/lib/actions";
import Onboarding from "@/app/onboarding/page";
import { render } from "@testing-library/react";
import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation");
vi.mock("@/app/lib/auth");
vi.mock("@/app/lib/tmdbActions");
vi.mock("@/app/onboarding/components/StartForm");
vi.mock("@/app/onboarding/lib/actions");

describe("Onboarding", () => {
  beforeEach(() => {
    vi.mocked(redirect).mockClear();
    vi.mocked(auth, { partial: true }).mockResolvedValueOnce({
      user: { id: "1", name: "Test", image: "", isProviderAccount: false },
    });
  });

  it("redirects to callback URL when it should skip and onboarding is complete", async () => {
    vi.mocked(verifyOnboardingComplete).mockResolvedValueOnce(true);
    const callbackUrl = "/test";

    const page = await Onboarding({
      searchParams: { skip: "true", callbackUrl },
    });
    render(page);

    expect(redirect).toHaveBeenCalledWith(callbackUrl);
  });

  it("does not redirect when it should not skip", async () => {
    const page = await Onboarding({ searchParams: {} });
    render(page);

    expect(redirect).not.toHaveBeenCalled();
  });
});
