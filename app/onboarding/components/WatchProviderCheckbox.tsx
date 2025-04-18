"use client";

import clsx from "clsx";
import { useCheckbox, VisuallyHidden, User, CheckboxIcon } from "@heroui/react";
import { WatchProvider } from "@/app/lib/definitions";

export default function WatchProviderCheckbox({
  provider,
}: {
  provider: WatchProvider;
}) {
  const { isSelected, isFocusVisible, getBaseProps, getInputProps } =
    useCheckbox({
      value: provider.provider_id.toString(),
      classNames: { base: "p-0 m-0" },
    });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <User
        name={provider.provider_name}
        classNames={{
          base: clsx(
            "flex-col w-16 align-start p-0",
            isFocusVisible && "outline-primary",
          ),
          name: "text-center truncate text-xs text-foreground-400 w-full",
          wrapper: "w-full",
        }}
        avatarProps={{
          imgProps: { width: 64, height: 64 },
          src: `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w92${provider.logo_path}`,
          className: "transition-opacity w-16 h-16",
          isDisabled: isSelected,
          radius: "lg",
        }}
      />
      <div className="absolute left-0 top-3 flex w-full justify-center">
        <CheckboxIcon isSelected={isSelected} className="size-10" />
      </div>
    </label>
  );
}
