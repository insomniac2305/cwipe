"use server";

import { signIn } from "@/app/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function signInAnonymous(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wrong.";
    }
    throw error;
  }
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
}
