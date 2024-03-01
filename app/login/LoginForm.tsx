"use client";

import { signInAnonymous } from "@/app/login/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button, Input } from "@nextui-org/react";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(signInAnonymous, undefined);
  const { pending } = useFormStatus();
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <Input
        label="Name"
        id="name"
        name="name"
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      />
      <Button type="submit" color="primary" isLoading={pending}>
        Get started
      </Button>
    </form>
  );
}
