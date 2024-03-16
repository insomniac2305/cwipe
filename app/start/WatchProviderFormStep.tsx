import { WatchProviderCheckboxGroup } from "./WatchProviderCheckboxGroup";
import { useContext } from "react";
import { FormStep, StepFormContext } from "@/app/components/StepForm";
import { ScrollShadow } from "@nextui-org/react";
import { WatchProvider } from "@/app/lib/definitions";

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
