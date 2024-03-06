import clsx from "clsx";
import { Monoton } from "next/font/google";

const monoton = Monoton({ weight: "400", subsets: ["latin"] });

type TextSize =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl"
  | "text-8xl"
  | "text-9xl";

export function BrandLogo({ size }: { size?: TextSize }) {
  return (
    <span className={clsx(monoton.className, size || "text-5xl", "p-2")}>
      CWIPE
    </span>
  );
}

export function BrandIcon({ size }: { size?: TextSize }) {
  return (
    <span className={clsx(monoton.className, size || "text-5xl", "p-2")}>
      C
    </span>
  );
}
