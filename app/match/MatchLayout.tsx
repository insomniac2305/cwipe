"use client";

import { LayoutArea } from "@/app/lib/definitions";
import clsx from "clsx";
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
        <div className={"relative flex"}>
          <aside
            className={clsx(
              "fixed left-0 top-0 z-10 h-dvh overflow-hidden bg-default-50 transition-width md:static",
              mobileView === "main" ? "w-0 md:w-0" : "w-full  md:w-96",
            )}
          >
            {sidebar}
          </aside>
          <main className="z-0 h-dvh flex-1">{children}</main>
        </div>
      </div>
    </MobileViewContext.Provider>
  );
}
