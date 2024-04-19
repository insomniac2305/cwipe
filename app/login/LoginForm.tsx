"use client";

import { signInAnonymous } from "@/app/login/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(signInAnonymous, undefined);
  const { pending } = useFormStatus();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <Input
        label="Your name"
        id="name"
        name="name"
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      />
      <input
        type="hidden"
        name="callbackUrl"
        value={callbackUrl || undefined}
      />
      <Button type="submit" color="primary" isLoading={pending}>
        Start session
      </Button>
    </form>
  );
}
