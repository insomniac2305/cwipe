"use client";
import { Button } from "@nextui-org/react";
import { FaListCheck, FaXmark } from "react-icons/fa6";
import { useSideInfoContext } from "@/app/match/[id]/components/MatchSessionLayout";

export function MatchListButton() {
  const { isSideInfoVisible, toggleSideInfo } = useSideInfoContext();

  return (
    <Button
      isIconOnly
      variant="flat"
      onPress={() => toggleSideInfo()}
      aria-description="Back"
    >
      {isSideInfoVisible ? <FaXmark /> : <FaListCheck />}
    </Button>
  );
}
