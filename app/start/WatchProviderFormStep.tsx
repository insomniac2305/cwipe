import { WatchProviderCheckboxGroup } from "./WatchProviderCheckboxGroup";
import { Suspense } from "react";
import { FormStep } from "@/app/components/StepForm";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ScrollShadow } from "@nextui-org/react";

export function WatchProviderFormStep({
  index,
  language,
  region,
}: {
  index: number;
  language: string;
  region: string;
}) {
  return (
    <FormStep index={index}>
      <h1 className="font-heading text-2xl">Watch Providers</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <ScrollShadow className="h-[calc(100%-2rem)]">
          <WatchProviderCheckboxGroup
            language={language || "en"}
            region={region || "DE"}
          />
        </ScrollShadow>
      </Suspense>
    </FormStep>
  );
}
