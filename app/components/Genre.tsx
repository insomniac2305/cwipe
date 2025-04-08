import clsx from "clsx";
import { Chip } from "@heroui/react";
import genreIcons from "@/app/lib/genreIcons";

export function Genre({
  id,
  isSelected,
  isFocused,
  isResponsive,
  size,
  children,
}: {
  id: number;
  isSelected?: boolean;
  isFocused?: boolean;
  isResponsive?: boolean;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}) {
  const Icon = genreIcons[id as keyof typeof genreIcons] || genreIcons[0];

  return (
    <Chip
      className={clsx(
        "transition-background",
        isResponsive && "xl:h-7 xl:text-sm",
        isFocused && "outline outline-2 outline-primary",
      )}
      classNames={{ content: clsx(isResponsive && "xl:pl-1") }}
      variant={isSelected ? "solid" : "flat"}
      size={size || "sm"}
      color={isSelected ? "primary" : "default"}
      startContent={
        <Icon
          className={clsx("mx-1 text-base", isResponsive && "xl:text-lg")}
        />
      }
    >
      {children}
    </Chip>
  );
}
