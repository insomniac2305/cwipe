"use client";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { FaListCheck } from "react-icons/fa6";
import { SideInfoContext } from "@/app/match/[id]/MatchSessionLayout";

export function MatchListButton() {
  const { toggleSideInfo } = useContext(SideInfoContext);

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
