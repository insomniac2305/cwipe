"use client";

import { signInAnonymous } from "@/app/login/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CallbackUrlInput() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <input type="hidden" name="callbackUrl" value={callbackUrl || undefined} />
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(signInAnonymous, undefined);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <Input
        label="Your name"
        id="name"
        name="name"
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      />
      <Suspense>
        <CallbackUrlInput />
      </Suspense>
      <Button type="submit" color="primary" isLoading={pending}>
        Start session
      </Button>
    </form>
  );
}
