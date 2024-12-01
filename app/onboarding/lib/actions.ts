"use server";

import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { FormState } from "@/app/lib/definitions";
import { validateFormData, composePostgresArray } from "@/app/lib/util";
import { createMatchSession } from "@/app/match/lib/actions";
import { onboardingSchema } from "@/app/onboarding/lib/validation";

export async function verifyOnboardingComplete(userId: string | undefined) {
  if (!userId) return false;
  try {
    const userPreferenceData = await sql`
      SELECT providers, genres, language, region 
      FROM user_preferences 
      WHERE user_id = ${userId}`;

    if (userPreferenceData.rowCount && userPreferenceData.rowCount < 1)
      return false;

    const { providers, genres, language, region } = userPreferenceData.rows[0];

    if (!providers || !genres || !language || !region) return false;
  } catch (error) {
    return false;
  }

  return true;
}

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

  const callbackUrl = formData.get("callbackUrl");
  if (
    typeof callbackUrl === "string" &&
    callbackUrl !== "" &&
    URL.canParse(callbackUrl, process.env.NEXT_PUBLIC_URL)
  ) {
    redirect(callbackUrl);
  }

  await createMatchSession();
}
