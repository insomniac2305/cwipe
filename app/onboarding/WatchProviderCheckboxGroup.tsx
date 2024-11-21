import { WatchProvider } from "@/app/lib/definitions";
import WatchProviderCheckbox from "@/app/onboarding/WatchProviderCheckbox";
import { CheckboxGroup } from "@nextui-org/react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { memo } from "react";

export const WatchProviderCheckboxGroup = memo(
  function WatchProviderCheckboxGroup({
    watchProviders,
    errors,
  }: {
    watchProviders: WatchProvider[];
    errors?: string[];
  }) {
    const searchParams = useSearchParams();
    const providersParam = searchParams.get("providers");
    const providerIds = providersParam?.split(",");

    return (
      <CheckboxGroup
        name="providers"
        label="Select your streaming providers"
        orientation="horizontal"
        className="gap-4"
        classNames={{
          wrapper: "justify-center gap-4",
          label: clsx("w-full", !!errors && "text-danger"),
          errorMessage: "w-full",
        }}
        isInvalid={!!errors}
        errorMessage={clsx(!!errors && "Please select at least one provider")}
        defaultValue={providerIds}
      >
        {watchProviders.map((provider) => (
          <WatchProviderCheckbox
            key={provider.provider_id}
            provider={provider}
          />
        ))}
      </CheckboxGroup>
    );
  },
);
