"use client";

import ConfigProvider from "@/app/configProvider";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ConfigProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </ConfigProvider>
  );
}
