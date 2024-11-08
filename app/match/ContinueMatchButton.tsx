"use client";

import React, { useContext } from "react";
import { Link, Button } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa6";
import { LayoutContext } from "@/app/match/MatchLayout";

export function ContinueMatchButton({ id }: { id: string }) {
  const { toggleAside } = useContext(LayoutContext);

  return (
    <Button
      isIconOnly
      variant="flat"
      as={Link}
      onPress={() => toggleAside()}
      href={`/match/${id}`}
      aria-description="Continue"
    >
      <FaPlay />
    </Button>
  );
}
