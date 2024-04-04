"use client";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";

export function ShareButton({ id }: { id: string }) {
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
        startContent={isLinkCopied ? <FaCheck /> : <FaPlus />}
        className="h-20 w-20 text-3xl"
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
