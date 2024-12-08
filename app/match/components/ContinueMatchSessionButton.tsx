"use client";

import React from "react";
import { Link, Button } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa6";
import { useSideNavContext } from "@/app/match/components/MatchLayout";

export function ContinueMatchSessionButton({ id }: { id: string }) {
  const { toggleSideNav } = useSideNavContext();

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
