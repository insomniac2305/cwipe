"use client";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useSideNavContext } from "@/app/match/components/MatchLayout";

export function MenuButton() {
  const { isSideNavVisible, toggleSideNav } = useSideNavContext();
  const pathname = usePathname();
  const isVisible = pathname !== "/match";

  return isVisible ? (
    <Button
      isIconOnly
      variant="flat"
      onPress={() => toggleSideNav()}
      aria-label="Menu"
    >
      {isSideNavVisible ? <FaXmark /> : <FaBars />}
    </Button>
  ) : (
    <></>
  );
}
