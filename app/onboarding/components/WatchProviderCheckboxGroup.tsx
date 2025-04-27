import clsx from "clsx";
import { Dispatch, memo, SetStateAction } from "react";
import { CheckboxGroup } from "@heroui/checkbox";
import { WatchProvider } from "@/app/lib/definitions";
import WatchProviderCheckbox from "@/app/onboarding/components/WatchProviderCheckbox";

export const WatchProviderCheckboxGroup = memo(
  function WatchProviderCheckboxGroup({
    watchProviders,
    selectedProviders,
    setSelectedProviders,
    errors,
  }: {
    watchProviders: WatchProvider[];
    selectedProviders?: string[];
    setSelectedProviders: Dispatch<SetStateAction<string[] | undefined>>;
    errors?: string[];
  }) {
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
        value={selectedProviders}
        onValueChange={setSelectedProviders}
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
