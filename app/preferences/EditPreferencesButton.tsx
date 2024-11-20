import { Button, Link } from "@nextui-org/react";
import { FaPenToSquare } from "react-icons/fa6";

export function EditPreferencesButton() {
  const searchParams = new URLSearchParams();
  searchParams.append("callbackUrl", "/preferences");
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
