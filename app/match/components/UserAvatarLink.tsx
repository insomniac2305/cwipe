import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { FaUser } from "react-icons/fa6";
import { auth } from "@/app/lib/auth";

export async function UserAvatarLink({ href }: { href: string }) {
  const session = await auth();
  return (
    <Button
      className="text-lg"
      href={href}
      isIconOnly
      as={Link}
      variant="solid"
      radius="full"
    >
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          alt="User"
          referrerPolicy="no-referrer"
        />
      ) : (
        <FaUser />
      )}
    </Button>
  );
}
