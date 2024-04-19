"use server";

import { signIn } from "@/app/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function signInAnonymous(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const options = {
      name: formData.get("name"),
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    };

    const callbackUrl = formData.get("callbackUrl");
    if (typeof callbackUrl === "string" && URL.canParse(callbackUrl)) {
      options.redirectTo = callbackUrl;
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
  await signIn("google", { redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT });
}
