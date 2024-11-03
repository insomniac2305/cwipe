"use client";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { MobileViewContext } from "@/app/match/MatchLayout";
import { FaBars } from "react-icons/fa6";

export function MenuButton() {
  const { mobileView, setMobileView } = useContext(MobileViewContext);

  return (
    <Button
      isIconOnly
      variant="flat"
      onPress={() => setMobileView(mobileView === "main" ? "aside" : "main")}
      aria-description="Back"
    >
      <FaBars />
    </Button>
  );
}
