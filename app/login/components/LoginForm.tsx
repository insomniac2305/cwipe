"use client";

import { ReactNode, Suspense, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { signInAnonymous } from "@/app/login/lib/actions";

function CallbackUrlInput() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <input type="hidden" name="callbackUrl" value={callbackUrl || undefined} />
  );
}

function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" isLoading={pending}>
      {children}
    </Button>
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useActionState(signInAnonymous, undefined);

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
      <SubmitButton>Start Session</SubmitButton>
    </form>
  );
}
