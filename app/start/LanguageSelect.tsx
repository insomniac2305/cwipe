"use client";

import { Language } from "@/app/lib/definitions";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LanguageSelect({ languages }: { languages: Language[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selection, setSelection] = useState<Selection>(
    new Set([searchParams.get("lang") || "en"]),
  );

  const handleSelect = (keys: Selection) => {
    setSelection(keys);

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const values = Array.from(keys);

    if (!values[0]) {
      params.delete("lang");
    } else {
      params.set("lang", values[0].toString());
    }

    const search = params.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <Select
      name="language"
      items={languages}
      label="Language"
      placeholder="Select your language"
      selectedKeys={selection}
      onSelectionChange={handleSelect}
      description="Used to fetch movie details and posters"
    >
      {(language) => (
        <SelectItem key={language.iso_639_1} value={language.iso_639_1}>
          {language.english_name}
        </SelectItem>
      )}
    </Select>
  );
}
