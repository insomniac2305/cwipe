"use client";

import { Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";
import { signInWithGoogle } from "@/app/login/lib/actions";

function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <Button
      className="shrink-0 bg-white font-medium text-[#1F1F1F]"
      aria-description="Google"
      startContent={<FcGoogle className="text-2xl" />}
      onPress={() => signInWithGoogle(callbackUrl || undefined)}
    >
      Sign in with Google
    </Button>
  );
}

export default function SuspendedGoogleSignInButton() {
  return (
    <Suspense>
      <GoogleSignInButton />
    </Suspense>
  );
}
