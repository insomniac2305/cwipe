import { getWatchProviders } from "@/app/lib/tmdbConfiguration";
import WatchProviderCheckbox from "@/app/start/WatchProviderCheckbox";
import { CheckboxGroup } from "@nextui-org/react";

export async function WatchProviderList({
  language,
  region,
}: {
  language: string;
  region: string;
}) {
  const watchProviders = await getWatchProviders(language, region);
  return (
    <CheckboxGroup
      label="Select your streaming providers"
      orientation="horizontal"
      className="items-center gap-4"
      classNames={{ wrapper: "justify-center gap-4" }}
    >
      {watchProviders.map((provider) => (
        <WatchProviderCheckbox key={provider.provider_id} provider={provider} />
      ))}
    </CheckboxGroup>
  );
}
