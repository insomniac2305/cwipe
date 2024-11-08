"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { createContext, useState } from "react";

export const LayoutContext = createContext<{
  isSideNavVisible: boolean;
  isSideInfoVisible: boolean;
  toggleSideNav: () => void;
  toggleSideInfo: () => void;
}>({
  isSideNavVisible: true,
  isSideInfoVisible: false,
  toggleSideNav: () => {},
  toggleSideInfo: () => {},
});

export default function MatchLayout({
  sideNav,
  sideInfo,
  children,
}: {
  sideNav: React.ReactNode;
  sideInfo: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSideNavVisible, setIsSideNavVisible] = useState<boolean>(
    pathname === "/match",
  );
  const [isSideInfoVisible, setIsSideInfoVisible] = useState<boolean>(false);

  const toggleSideNav = () => setIsSideNavVisible((prevState) => !prevState);
  const toggleSideInfo = () => setIsSideInfoVisible((prevState) => !prevState);

  return (
    <LayoutContext.Provider
      value={{
        isSideNavVisible,
        isSideInfoVisible: isSideInfoVisible,
        toggleSideNav,
        toggleSideInfo,
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
          <aside
            className={clsx(
              "fixed right-0 top-0 z-10 h-dvh overflow-hidden bg-default-50 transition-width md:static",
              isSideInfoVisible ? "w-full md:w-96" : "w-0 md:w-0",
            )}
          >
            {sideInfo}
          </aside>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
