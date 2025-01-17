"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { createMatchSession } from "@/app/match/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button color="primary" type="submit" isLoading={pending}>
      Start session
    </Button>
  );
}

export function CreateMatchSessionForm() {
  const [state, dispatch] = useFormState(createMatchSession, undefined);

  return (
    <form action={dispatch} className="flex flex-col items-center gap-4">
      {state?.error && <ErrorMessage>{state.error.message}</ErrorMessage>}
      <SubmitButton />
    </form>
  );
}
