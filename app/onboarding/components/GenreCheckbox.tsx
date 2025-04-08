"use client";

import { useCheckbox, VisuallyHidden } from "@heroui/react";
import { Genre as GenreType } from "@/app/lib/definitions";
import { Genre } from "@/app/components/Genre";

export default function GenreCheckbox({ genre }: { genre: GenreType }) {
  const { isSelected, isFocusVisible, getBaseProps, getInputProps } =
    useCheckbox({
      value: genre.id.toString(),
      classNames: { base: "p-0 m-0" },
    });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Genre
        id={genre.id}
        isSelected={isSelected}
        isFocused={isFocusVisible}
        size="md"
      >
        {genre.name}
      </Genre>
    </label>
  );
}
