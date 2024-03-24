"use client";

import { Region } from "@/app/lib/definitions";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function RegionSelect({
  regions,
  errors,
}: {
  regions: Region[];
  errors?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selection, setSelection] = useState<Selection>(
    new Set([searchParams.get("region") || "DE"]),
  );

  const handleSelect = (keys: Selection) => {
    setSelection(keys);

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const values = Array.from(keys);

    if (!values[0]) {
      params.delete("region");
    } else {
      params.set("region", values[0].toString());
    }

    const search = params.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <Select
      name="region"
      label="Region"
      placeholder="Select your region"
      description="Determines available streaming providers"
      items={regions}
      selectionMode="single"
      selectedKeys={selection}
      onSelectionChange={handleSelect}
      isInvalid={!!errors}
      errorMessage={errors}
    >
      {(region) => (
        <SelectItem key={region.iso_3166_1} value={region.iso_3166_1}>
          {region.english_name}
        </SelectItem>
      )}
    </Select>
  );
}
