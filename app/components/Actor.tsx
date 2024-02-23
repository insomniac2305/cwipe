import { getInitials } from "@/app/lib/util";
import { User } from "@nextui-org/react";

export function Actor({
  name,
  role,
  imageSrc,
}: {
  name: string;
  role: string;
  imageSrc?: string;
}) {
  return (
    <User
      avatarProps={{
        className: "h-20 w-20",
        classNames: {
          name: "text-3xl font-medium",
        },
        getInitials: getInitials,
        src:
          imageSrc &&
          `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w185/${imageSrc}`,
      }}
      name={name}
      description={role}
      classNames={{
        base: "flex flex-col items-center",
        wrapper: "text-center",
        description: "w-20 overflow-hidden text-ellipsis whitespace-nowrap",
      }}
    />
  );
}
