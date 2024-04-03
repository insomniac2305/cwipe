"use client";

import { User } from "@/app/components/User";
import { MatchSession } from "@/app/lib/definitions";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";

function ShareButton({ id }: { id: string }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const shareLink = () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const shareUrl = `${baseUrl}/match/${id}`;
    const shareData = {
      title: "Movie Matching Session",
      text: "Join me on Cwipe to find out what movie we can watch together!",
      url: shareUrl,
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      try {
        navigator.clipboard.writeText(shareUrl);
        setIsLinkCopied(true);
      } catch (error) {
        alert("Error writing to clipboard");
      }
    }
  };

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isLinkCopied) {
      id = setTimeout(() => {
        setIsLinkCopied(false);
      }, 5000);
    }
    return () => clearTimeout(id);
  }, [isLinkCopied]);

  return (
    <div className="flex flex-col gap-2">
      <Button
        isIconOnly
        startContent={
          isLinkCopied ? (
            <FaCheck className="text-3xl" />
          ) : (
            <FaPlus className="text-3xl" />
          )
        }
        className="h-20 w-20"
        variant="flat"
        radius="full"
        color={isLinkCopied ? "success" : "default"}
        onPress={shareLink}
      />
      <span className="w-20 text-center text-sm">
        {isLinkCopied ? "Link copied" : "Invite"}
      </span>
    </div>
  );
}

export default function Lobby({
  matchSession,
}: {
  matchSession: MatchSession;
}) {
  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-auto p-8 md:max-h-[40rem] md:max-w-screen-md">
        <h1 className="font-heading text-2xl">Lobby</h1>
        <div className="flex flex-auto flex-wrap items-start gap-2 py-4">
          {matchSession.users.map((user, index) => (
            <User
              key={user.id}
              name={user.name || `User #${index}`}
              imageSrc={user.image || undefined}
            />
          ))}
          <ShareButton id={matchSession.id} />
        </div>
        <div className="flex justify-center">
          <Button color="primary">Start matching</Button>
        </div>
      </div>
    </main>
  );
}
