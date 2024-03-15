"use client";
import { Button, Progress } from "@nextui-org/react";
import { FormHTMLAttributes, ReactNode, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { ZodType } from "zod";
import { validateFormData } from "@/app/lib/util";
import { FlattenedValidationErrors } from "@/app/lib/definitions";
import { StepFormContext } from "@/app/components/StepForm";

export default function StepForm({
  action,
  stepCount,
  validationSteps,
  children,
}: {
  action: FormHTMLAttributes<HTMLFormElement>["action"];
  stepCount: number;
  validationSteps: ZodType[];
  children: ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [validationErrors, setValidationErrors] =
    useState<FlattenedValidationErrors>();

  const hasNextStep = currentStep < stepCount - 1;
  const hasPrevStep = currentStep > 0;

  const handleSubmit = (formData: FormData) => {
    const validator = validationSteps[currentStep];

    if (validator) {
      const validationResult = validateFormData(formData, validator);
      if (validationResult.success) {
        setValidationErrors(undefined);
      } else {
        setValidationErrors(validationResult.error.flatten());
        return;
      }
    }

    if (hasNextStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      if (typeof action !== "function") return;
      action(formData);
    }
  };

  return (
    <StepFormContext.Provider value={{ currentStep, validationErrors }}>
      <form action={handleSubmit} className="flex h-full w-full flex-col gap-8">
        <div className="relative flex flex-none items-center justify-center gap-2">
          <Button
            isIconOnly
            className="absolute left-0"
            variant="light"
            onPress={() => {
              if (hasPrevStep) {
                setCurrentStep((prev) => prev - 1);
              }
            }}
          >
            <FaChevronLeft />
          </Button>
          <Progress
            aria-label="Progress"
            className="px-12"
            value={(currentStep / stepCount) * 100}
          />
        </div>

        <div className="relative flex-1 overflow-hidden">{children}</div>

        <div className="flex flex-none items-center justify-center">
          <Button color="primary" type="submit">
            {hasNextStep ? "Next" : "Submit"}
          </Button>
        </div>
      </form>
    </StepFormContext.Provider>
  );
}
