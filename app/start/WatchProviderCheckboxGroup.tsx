import { WatchProvider } from "@/app/lib/definitions";
import WatchProviderCheckbox from "@/app/start/WatchProviderCheckbox";
import { CheckboxGroup } from "@nextui-org/react";

export async function WatchProviderCheckboxGroup({
  watchProviders,
}: {
  watchProviders: WatchProvider[];
}) {
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
