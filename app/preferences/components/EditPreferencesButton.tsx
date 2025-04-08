import { Button, Link } from "@heroui/react";
import { FaPenToSquare } from "react-icons/fa6";
import { getUserPreferences } from "@/app/preferences/lib/actions";

export async function EditPreferencesButton() {
  const { data: userPreferences } = await getUserPreferences();

  const searchParams = new URLSearchParams();
  searchParams.append("callbackUrl", "/preferences");

  if (userPreferences) {
    const { language, region, providers, genres } = userPreferences;
    language && searchParams.append("lang", language.iso_639_1);
    region && searchParams.append("region", region.iso_3166_1);

    if (providers.length > 0) {
      const providerIds = providers.map((provider) => provider.provider_id);
      searchParams.append("providers", providerIds.toString());
    }

    if (genres.length > 0) {
      const genreIds = genres.map((genre) => genre.id);
      searchParams.append("genres", genreIds.toString());
    }
  }

  const onboardingUrl = `/onboarding?${searchParams.toString()}`;

  return (
    <Button
      as={Link}
      href={onboardingUrl}
      startContent={<FaPenToSquare />}
      color="primary"
    >
      Edit preferences
    </Button>
  );
}
