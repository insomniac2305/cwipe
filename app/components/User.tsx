import { User as HeroUIUser } from "@heroui/user";
import { getInitials } from "@/app/lib/util";

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
    <HeroUIUser
      avatarProps={{
        className: "h-20 w-20",
        classNames: {
          name: "text-3xl font-medium",
        },
        getInitials: getInitials,
        src: imageSrc,
        imgProps: { draggable: false, referrerPolicy: "no-referrer" },
      }}
      name={name}
      description={description}
      classNames={{
        base: "flex flex-col items-center",
        wrapper: "text-center",
        name: "text-center w-20 flex justify-center",
        description: "w-20 overflow-hidden text-ellipsis whitespace-nowrap",
      }}
    />
  );
}
