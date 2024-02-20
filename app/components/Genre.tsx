import genreIcons from "@/app/lib/genreIcons";
import { Chip } from "@nextui-org/react";

export function Genre({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) {
  const Icon = genreIcons[id as keyof typeof genreIcons] || genreIcons[0];

  return (
    <Chip
      variant="flat"
      size="sm"
      color="default"
      startContent={<Icon className="mx-1 text-base" />}
    >
      {children}
    </Chip>
  );
}
