"use client";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { SideNavContext } from "@/app/match/MatchLayout";
import { FaBars, FaXmark } from "react-icons/fa6";
import { usePathname } from "next/navigation";

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
