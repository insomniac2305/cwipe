import { useContext } from "react";
import { ScrollShadow } from "@heroui/react";
import { WatchProvider } from "@/app/lib/definitions";
import {
  FormStep,
  StepFormContext,
} from "@/app/onboarding/components/StepForm";
import { WatchProviderCheckboxGroup } from "@/app/onboarding/components/WatchProviderCheckboxGroup";

export function WatchProviderFormStep({
  index,
  watchProviders,
}: {
  index: number;
  watchProviders: WatchProvider[];
}) {
  const { validationErrors } = useContext(StepFormContext);

  return (
    <FormStep index={index}>
      <h1 className="font-heading text-2xl">Watch Providers</h1>
      <ScrollShadow className="h-[calc(100%-2rem)]">
        <WatchProviderCheckboxGroup
          watchProviders={watchProviders}
          errors={validationErrors?.fieldErrors.providers}
        />
      </ScrollShadow>
    </FormStep>
  );
}
