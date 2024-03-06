import clsx from "clsx";

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
    <span className={clsx(size || "text-6xl", "font-heading p-2")}>Cwipe</span>
  );
}

export function BrandIcon() {
  return (
    <span className={clsx("font-heading size-14 overflow-hidden text-[16rem]")}>
      <span className="relative -left-3 -top-[14.5rem]">.</span>
    </span>
  );
}
