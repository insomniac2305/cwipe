"use server";

import { signIn } from "@/app/lib/auth";
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
