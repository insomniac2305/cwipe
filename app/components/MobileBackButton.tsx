"use client";
import { LayoutArea } from "@/app/lib/definitions";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { MobileViewContext } from "@/app/match/MatchLayout";
import { FaChevronLeft } from "react-icons/fa6";

export function MobileBackButton({ targetView }: { targetView: LayoutArea }) {
  const { setMobileView } = useContext(MobileViewContext);

  return (
    <Button
      isIconOnly
      variant="flat"
      // className="md:hidden"
      onPress={() => setMobileView(targetView)}
      aria-description="Back"
    >
      <FaChevronLeft />
    </Button>
  );
}
