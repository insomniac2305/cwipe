"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { createContext, useState } from "react";

export const LayoutContext = createContext<{
  isAsideVisible: boolean;
  isDetailsVisible: boolean;
  toggleAside: () => void;
  toggleDetails: () => void;
}>({
  isAsideVisible: true,
  isDetailsVisible: false,
  toggleAside: () => {},
  toggleDetails: () => {},
});

export default function MatchLayout({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAsideVisible, setIsAsideVisible] = useState<boolean>(
    pathname === "/match",
  );
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);

  const toggleAside = () => setIsAsideVisible((prevState) => !prevState);
  const toggleDetails = () => setIsDetailsVisible((prevState) => !prevState);

  return (
    <LayoutContext.Provider
      value={{
        isAsideVisible,
        isDetailsVisible,
        toggleAside,
        toggleDetails,
      }}
    >
      <div className="w-dvw overflow-hidden">
        <div className={"relative flex"}>
          <aside
            className={clsx(
              "fixed left-0 top-0 z-20 h-dvh overflow-hidden bg-default-50 transition-width md:static",
              isAsideVisible ? "w-full md:w-96" : "w-0 md:w-0",
            )}
          >
            {sidebar}
          </aside>
          <main className="z-0 h-dvh flex-1">{children}</main>
          <details
            className={clsx(
              "fixed right-0 top-0 z-10 h-dvh overflow-hidden bg-default-50 transition-width md:static",
              isDetailsVisible ? "w-full md:w-96" : "w-0 md:w-0",
            )}
          >
            {sidebar}
          </details>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
