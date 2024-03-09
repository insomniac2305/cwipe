import genreIcons from "@/app/lib/genreIcons";
import { Chip } from "@nextui-org/react";
import clsx from "clsx";

export function Genre({
  id,
  isSelected,
  isFocused,
  size,
  children,
}: {
  id: number;
  isSelected?: boolean;
  isFocused?: boolean;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}) {
  const Icon = genreIcons[id as keyof typeof genreIcons] || genreIcons[0];

  return (
    <Chip
      className={clsx(
        "transition-background",
        isFocused && "outline outline-2 outline-primary",
      )}
      variant={isSelected ? "solid" : "flat"}
      size={size || "sm"}
      color={isSelected ? "primary" : "default"}
      startContent={<Icon className="mx-1 text-base" />}
    >
      {children}
    </Chip>
  );
}
