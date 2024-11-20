"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { FaRightFromBracket } from "react-icons/fa6";

export default function SignOutButton() {
  return (
    <Button onPress={() => signOut()} startContent={<FaRightFromBracket />}>
      Sign Out
    </Button>
  );
}
