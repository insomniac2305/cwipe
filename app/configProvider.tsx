"use client";

import { createContext } from "react";

export const ConfigContext = createContext({ language: "", region: "" });

export default function ConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigContext.Provider value={{ language: "de-DE", region: "DE" }}>
      {children}
    </ConfigContext.Provider>
  );
}
