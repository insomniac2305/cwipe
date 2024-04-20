"use server";

import { signIn } from "@/app/lib/auth";
import { AuthError } from "next-auth";

export async function signInAnonymous(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const options = {
      name: formData.get("name"),
      redirectTo: "/onboarding",
    };

    const callbackUrl = formData.get("callbackUrl");
    if (typeof callbackUrl === "string") {
      const searchParams = new URLSearchParams();
      searchParams.append("callbackUrl", callbackUrl);
      options.redirectTo = `/onboarding?${searchParams.toString()}`;
    }

    await signIn("credentials", options);
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wrong.";
    }
    throw error;
  }
}

export async function signInWithGoogle(callbackUrl?: string) {
  const searchParams = new URLSearchParams();
  searchParams.append("skip", "true");
  if (callbackUrl) searchParams.append("callbackUrl", callbackUrl);
  const redirectTo = `/onboarding?${searchParams.toString()}`;

  await signIn("google", { redirectTo });
}
