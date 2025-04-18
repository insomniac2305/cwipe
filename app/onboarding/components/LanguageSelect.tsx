"use client";

import { Select, SelectItem } from "@heroui/react";
import { Language } from "@/app/lib/definitions";
import { useSearchParamSelect } from "@/app/onboarding/lib/useSearchParamSelect";

export function LanguageSelect({
  languages,
  errors,
}: {
  languages: Language[];
  errors?: string[];
}) {
  const [selection, handleSelect] = useSearchParamSelect("lang", "en");

  return (
    <Select
      name="language"
      label="Language"
      placeholder="Select your language"
      description="Used to fetch movie details and posters"
      items={languages}
      selectionMode="single"
      selectedKeys={selection}
      onSelectionChange={handleSelect}
      isInvalid={!!errors}
      errorMessage={errors}
    >
      {(language) => (
        <SelectItem key={language.iso_639_1}>
          {language.english_name}
        </SelectItem>
      )}
    </Select>
  );
}
