"use client";

import { LayoutArea } from "@/app/lib/definitions";
import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { createContext, useState } from "react";

export const MobileViewContext = createContext<{
  mobileView: LayoutArea;
  setMobileView: (area: LayoutArea) => void;
}>({ mobileView: "aside", setMobileView: () => {} });

export default function MatchLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileView, setMobileView] = useState<"aside" | "main">(
    pathname === "/match" ? "aside" : "main",
  );

  return (
    <MobileViewContext.Provider value={{ mobileView, setMobileView }}>
      <div className="w-dvw overflow-hidden">
        <motion.div
          layout
          className={clsx(
            "relative grid grid-cols-[100%_100%] md:grid-cols-[minmax(400px,1fr)_4fr]",
            mobileView === "main" && "-left-full md:-left-0",
          )}
        >
          <aside className="h-dvh">{sidebar}</aside>
          <main className="h-dvh">{children}</main>
        </motion.div>
      </div>
    </MobileViewContext.Provider>
  );
}
