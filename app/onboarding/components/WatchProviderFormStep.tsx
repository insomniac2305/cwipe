import { useContext, useState } from "react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { WatchProvider } from "@/app/lib/definitions";
import {
  FormStep,
  StepFormContext,
} from "@/app/onboarding/components/StepForm";
import { WatchProviderCheckboxGroup } from "@/app/onboarding/components/WatchProviderCheckboxGroup";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";

export function WatchProviderFormStep({
  index,
  watchProviders,
}: {
  index: number;
  watchProviders: WatchProvider[];
}) {
  const { validationErrors } = useContext(StepFormContext);

  const searchParams = useSearchParams();
  const providersParam = searchParams.get("providers");
  const providerIds = providersParam?.split(",");
  const allProviderIds = watchProviders.map((p) => p.provider_id.toString());

  const selectAllProviders = () => setSelectedProviders(allProviderIds);
  const unselectAll = () => setSelectedProviders([]);
  const [selectedProviders, setSelectedProviders] = useState(providerIds);

  return (
    <FormStep index={index}>
      <div className="flex flex-wrap justify-between gap-2 py-2">
        <h1 className="font-heading text-2xl">Watch Providers</h1>
        <div className="flex flex-nowrap gap-2">
          <Button onPress={selectAllProviders} size="sm" variant="flat">
            Select all
          </Button>
          <Button onPress={unselectAll} size="sm" variant="flat">
            Unselect all
          </Button>
        </div>
      </div>
      <ScrollShadow className="h-[calc(100%-2rem)]">
        <WatchProviderCheckboxGroup
          watchProviders={watchProviders}
          selectedProviders={selectedProviders}
          setSelectedProviders={setSelectedProviders}
          errors={validationErrors?.fieldErrors.providers}
        />
      </ScrollShadow>
    </FormStep>
  );
}
