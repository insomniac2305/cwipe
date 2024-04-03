"use client";

import { User } from "@/app/components/User";
import { MatchSession } from "@/app/lib/definitions";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

export default function Lobby({
  matchSession,
}: {
  matchSession: MatchSession;
}) {
  const pathname = usePathname();

  const shareLink = () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const shareUrl = `${baseUrl}${pathname}`;
    if (navigator.share) {
      navigator.share({ url: shareUrl });
    }
  };

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-auto p-8 md:max-h-[40rem] md:max-w-screen-md">
        <h1 className="font-heading text-2xl">Lobby</h1>
        <div className="flex flex-auto flex-wrap items-start gap-2 py-4">
          {matchSession.userIds.map((id, index) => (
            <User key={id} name={`User ${index}`} />
          ))}
          <div className="flex flex-col gap-2">
            <Button
              isIconOnly
              startContent={<FaPlus className="text-3xl" />}
              className="h-20 w-20"
              variant="flat"
              radius="full"
              onPress={shareLink}
            />
            <span className="w-20 text-center text-sm">Invite</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Button color="primary">Start matching</Button>
        </div>
      </div>
    </main>
  );
}
