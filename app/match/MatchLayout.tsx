"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { createContext, useState } from "react";

export const SideNavContext = createContext<{
  isSideNavVisible: boolean;
  toggleSideNav: () => void;
}>({
  isSideNavVisible: true,
  toggleSideNav: () => {},
});

export default function MatchLayout({
  sideNav,
  children,
}: {
  sideNav: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSideNavVisible, setIsSideNavVisible] = useState<boolean>(
    pathname === "/match",
  );
  const toggleSideNav = () => setIsSideNavVisible((prevState) => !prevState);

  return (
    <SideNavContext.Provider
      value={{
        isSideNavVisible,
        toggleSideNav,
      }}
    >
      <div className="w-dvw overflow-hidden">
        <div className={"relative flex"}>
          <nav
            className={clsx(
              "fixed left-0 top-0 z-20 h-dvh overflow-hidden bg-default-50 transition-width md:static",
              isSideNavVisible ? "w-full md:w-96" : "w-0 md:w-0",
            )}
          >
            {sideNav}
          </nav>
          <main className="z-0 h-dvh flex-1">{children}</main>
        </div>
      </div>
    </SideNavContext.Provider>
  );
}
