"use client";

import { signOut } from "next-auth/react";
import { Button } from "@heroui/react";
import { FaRightFromBracket } from "react-icons/fa6";

export default function SignOutButton() {
  return (
    <Button onPress={() => signOut()} startContent={<FaRightFromBracket />}>
      Sign Out
    </Button>
  );
}
