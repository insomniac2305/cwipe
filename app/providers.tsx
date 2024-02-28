"use client";

import ConfigProvider from "@/app/configProvider";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <SessionProvider>
      <ConfigProvider>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </ConfigProvider>
    </SessionProvider>
  );
}
