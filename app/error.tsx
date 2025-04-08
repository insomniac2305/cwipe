"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6">
      <h1 className="font-heading text-2xl">Something went wrong!</h1>
      <Button size="lg" color="primary" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
