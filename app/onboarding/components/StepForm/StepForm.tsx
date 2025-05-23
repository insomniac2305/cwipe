"use client";
import { AnyZodObject } from "zod";
import {
  ReactNode,
  useState,
  useActionState,
  FormEventHandler,
  startTransition,
  useEffect,
} from "react";
import { useFormStatus } from "react-dom";
import { Button, Progress } from "@heroui/react";
import { FaChevronLeft } from "react-icons/fa6";
import { validateFormData } from "@/app/lib/util";
import { FlattenedValidationErrors, FormState } from "@/app/lib/definitions";
import { StepFormContext } from "@/app/onboarding/components/StepForm";

function SubmitButton({ hasNextStep }: { hasNextStep: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button color="primary" type="submit" isLoading={!hasNextStep && pending}>
      {hasNextStep ? "Next" : "Submit"}
    </Button>
  );
}

function FormProgress({
  currentStep,
  stepCount,
  hasNextStep,
}: {
  currentStep: number;
  stepCount: number;
  hasNextStep: boolean;
}) {
  const { pending } = useFormStatus();

  const progress =
    !hasNextStep && pending ? 100 : (currentStep / stepCount) * 100;

  return <Progress aria-label="Progress" className="px-12" value={progress} />;
}

export default function StepForm({
  action,
  stepCount,
  validationSteps,
  children,
}: {
  action: (
    state: FormState | undefined,
    formData: FormData,
  ) => Promise<FormState | undefined>;
  stepCount: number;
  validationSteps: AnyZodObject[];
  children: ReactNode;
}) {
  const [state, formAction] = useActionState(action, undefined);
  const [currentStep, setCurrentStep] = useState(0);
  const [validationErrors, setValidationErrors] =
    useState<FlattenedValidationErrors>();

  const hasNextStep = currentStep < stepCount - 1;
  const hasPrevStep = currentStep > 0;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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
      startTransition(() => formAction(formData));
    }
  };

  useEffect(() => {
    if (!state?.errors) return;

    for (let i = 0; i < validationSteps.length; i++) {
      const fields = Object.keys(validationSteps[i].shape);
      for (const field of fields) {
        if (state.errors?.fieldErrors[field]) {
          setCurrentStep(i);
          return;
        }
      }
    }
  }, [state, validationSteps]);

  return (
    <StepFormContext.Provider
      value={{
        currentStep,
        validationErrors: validationErrors || state?.errors,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col gap-8"
        noValidate
      >
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
          <FormProgress
            stepCount={stepCount}
            currentStep={currentStep}
            hasNextStep={hasNextStep}
          />
        </div>

        <div className="relative flex-1 overflow-hidden">{children}</div>

        <div className="flex flex-none items-center justify-center">
          <SubmitButton hasNextStep={hasNextStep}></SubmitButton>
        </div>
      </form>
    </StepFormContext.Provider>
  );
}
