"use client";

import React, { useContext } from "react";
import { Link, Button } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa6";
import { LayoutContext } from "@/app/match/MatchLayout";

export function ContinueMatchButton({ id }: { id: string }) {
  const { toggleSideNav } = useContext(LayoutContext);

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
