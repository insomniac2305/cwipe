import { getInitials } from "@/app/lib/util";
import { User as NextUIUser } from "@nextui-org/react";

export function User({
  name,
  description,
  imageSrc,
}: {
  name: string;
  description?: string;
  imageSrc?: string;
}) {
  return (
    <NextUIUser
      avatarProps={{
        className: "h-20 w-20",
        classNames: {
          name: "text-3xl font-medium",
        },
        getInitials: getInitials,
        src: imageSrc,
      }}
      name={name}
      description={description}
      classNames={{
        base: "flex flex-col items-center",
        wrapper: "text-center",
        name: "text-center w-20",
        description: "w-20 overflow-hidden text-ellipsis whitespace-nowrap",
      }}
    />
  );
}
