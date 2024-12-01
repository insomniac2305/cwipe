"use client";

import React, { useContext } from "react";
import { Link, Button } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa6";
import { SideNavContext } from "@/app/match/components/MatchLayout";

export function ContinueMatchSessionButton({ id }: { id: string }) {
  const { toggleSideNav } = useContext(SideNavContext);

  return (
    <Button
      isIconOnly
      variant="flat"
      as={Link}
      onPress={() => toggleSideNav()}
      href={`/match/${id}`}
      aria-description="Continue"
    >
      <FaPlay />
    </Button>
  );
}
