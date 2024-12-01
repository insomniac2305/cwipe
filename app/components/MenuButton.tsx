"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { SideNavContext } from "@/app/match/components/MatchLayout";

export function MenuButton() {
  const { isSideNavVisible, toggleSideNav } = useContext(SideNavContext);
  const pathname = usePathname();
  const isVisible = pathname !== "/match";

  return isVisible ? (
    <Button
      isIconOnly
      variant="flat"
      onPress={() => toggleSideNav()}
      aria-description="Back"
    >
      {isSideNavVisible ? <FaXmark /> : <FaBars />}
    </Button>
  ) : (
    <></>
  );
}
