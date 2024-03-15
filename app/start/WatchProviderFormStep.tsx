import { WatchProviderCheckboxGroup } from "./WatchProviderCheckboxGroup";
import { Suspense } from "react";
import { FormStep } from "@/app/components/StepForm";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ScrollShadow } from "@nextui-org/react";
import { WatchProvider } from "@/app/lib/definitions";

export function WatchProviderFormStep({
  index,
  watchProviders,
}: {
  index: number;
  watchProviders: WatchProvider[];
}) {
  return (
    <FormStep index={index}>
      <h1 className="font-heading text-2xl">Watch Providers</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <ScrollShadow className="h-[calc(100%-2rem)]">
          <WatchProviderCheckboxGroup watchProviders={watchProviders} />
        </ScrollShadow>
      </Suspense>
    </FormStep>
  );
}
