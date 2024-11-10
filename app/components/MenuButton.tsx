"use client";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { SideNavContext } from "@/app/match/MatchLayout";
import { FaBars, FaXmark } from "react-icons/fa6";

export function MenuButton() {
  const { isSideNavVisible, toggleSideNav } = useContext(SideNavContext);

  return (
    <Button
      isIconOnly
      variant="flat"
      onPress={() => toggleSideNav()}
      aria-description="Back"
    >
      {isSideNavVisible ? <FaXmark /> : <FaBars />}
    </Button>
  );
}
