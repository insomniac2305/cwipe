"use client";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { LayoutContext } from "@/app/match/MatchLayout";
import { FaBars } from "react-icons/fa6";

export function MenuButton() {
  const { toggleSideNav } = useContext(LayoutContext);

  return (
    <Button
      isIconOnly
      variant="flat"
      onPress={() => toggleSideNav()}
      aria-description="Back"
    >
      <FaBars />
    </Button>
  );
}
