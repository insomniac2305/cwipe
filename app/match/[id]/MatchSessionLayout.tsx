"use client";

import clsx from "clsx";
import { createContext, useState } from "react";

export const SideInfoContext = createContext<{
  isSideInfoVisible: boolean;
  toggleSideInfo: () => void;
}>({
  isSideInfoVisible: false,
  toggleSideInfo: () => {},
});

export default function MatchSessionLayout({
  sideInfo,
  children,
}: {
  sideInfo: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isSideInfoVisible, setIsSideInfoVisible] = useState<boolean>(false);
  const toggleSideInfo = () => setIsSideInfoVisible((prevState) => !prevState);

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
            isSideInfoVisible ? "w-full md:w-96" : "w-0 md:w-0",
          )}
        >
          {sideInfo}
        </aside>
      </div>
    </SideInfoContext.Provider>
  );
}
