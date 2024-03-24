"use server";

import { auth } from "@/app/lib/auth";
import { FormState } from "@/app/lib/definitions";
import { validateFormData } from "@/app/lib/util";
import { redirect } from "next/navigation";
import { onboardingSchema } from "./validation";
import { sql } from "@vercel/postgres";
import { composePostgresArray } from "../lib/util";

export async function submitUserOnboarding(
  prevState: FormState | undefined,
  formData: FormData,
) {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized");

  const validationResult = validateFormData(formData, onboardingSchema);

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten() };
  }

  const { data } = validationResult;

  const providersArray = composePostgresArray(data.providers);
  const genresArray = composePostgresArray(data.genres);

  try {
    await sql`
    INSERT INTO user_preferences (user_id, providers, genres, language, region)
    VALUES(${session.user.id}, ${providersArray}, ${genresArray}, ${data.language}, ${data.region})
    ON CONFLICT (user_id)
    DO UPDATE SET providers = ${providersArray}, genres = ${genresArray}, language = ${data.language}, region = ${data.region}
     `;
  } catch (error) {
    return {
      errors: { formErrors: ["Something went wrong."], fieldErrors: {} },
    };
  }

  redirect("/match");
}
