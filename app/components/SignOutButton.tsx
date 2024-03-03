"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return <Button onPress={() => signOut()}>Sign Out</Button>;
}
