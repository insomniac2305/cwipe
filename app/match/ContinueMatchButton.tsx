"use client";

import React, { useContext } from "react";
import { Link, Button } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa6";
import { MobileViewContext } from "@/app/match/MatchLayout";

export function ContinueMatchButton({ id }: { id: string }) {
  const { setMobileView } = useContext(MobileViewContext);

  return (
    <Button
      isIconOnly
      variant="flat"
      as={Link}
      onPress={() => setMobileView("main")}
      href={`/match/${id}`}
      aria-description="Continue"
    >
      <FaPlay />
    </Button>
  );
}
