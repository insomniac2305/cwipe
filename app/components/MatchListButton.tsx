"use client";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { LayoutContext } from "@/app/match/MatchLayout";
import { FaListCheck } from "react-icons/fa6";

export function MatchListButton() {
  const { toggleSideInfo } = useContext(LayoutContext);

  return (
    <Button
      isIconOnly
      variant="flat"
      onPress={() => toggleSideInfo()}
      aria-description="Back"
    >
      <FaListCheck />
    </Button>
  );
}
