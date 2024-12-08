"use client";

import clsx from "clsx";
import { createContext, useContext, useState } from "react";
import { useSideNavContext } from "@/app/match/components/MatchLayout";

const SideInfoContext = createContext<{
  isSideInfoVisible: boolean;
  toggleSideInfo: () => void;
}>({
  isSideInfoVisible: false,
  toggleSideInfo: () => {},
});

export const useSideInfoContext = () => useContext(SideInfoContext);

export default function MatchSessionLayout({
  sideInfo,
  children,
}: {
  sideInfo: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isSideInfoVisible, setIsSideInfoVisible] = useState<boolean>(false);
  const toggleSideInfo = () => setIsSideInfoVisible((prevState) => !prevState);
  const { isSideNavVisible } = useSideNavContext();

  return (
    <SideInfoContext.Provider
      value={{
        isSideInfoVisible,
        toggleSideInfo,
      }}
    >
      <div className={"relative flex h-full w-full"}>
        <main className="z-0 h-full flex-1">{children}</main>
        <aside
          className={clsx(
            "fixed right-0 top-0 z-10 h-full overflow-hidden bg-default-50 transition-width md:static",
            isSideInfoVisible && !isSideNavVisible
              ? "w-full lg:w-[32rem]"
              : "w-0 lg:w-0",
            isSideInfoVisible &&
              isSideNavVisible &&
              "w-full lg:w-full 2xl:w-[32rem]",
          )}
        >
          {sideInfo}
        </aside>
      </div>
    </SideInfoContext.Provider>
  );
}
