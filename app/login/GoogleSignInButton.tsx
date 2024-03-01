"use client";

import { signInWithGoogle } from "@/app/login/actions";
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  return (
    <Button
      className="bg-white font-medium text-[#1F1F1F]"
      aria-description="Google"
      startContent={<FcGoogle className="text-2xl" />}
      onPress={() => signInWithGoogle()}
    >
      Sign in with Google
    </Button>
  );
}
