"use client";

import { Select, SelectItem } from "@heroui/react";
import { Region } from "@/app/lib/definitions";
import { useSearchParamSelect } from "@/app/onboarding/lib/useSearchParamSelect";

export function RegionSelect({
  regions,
  errors,
}: {
  regions: Region[];
  errors?: string[];
}) {
  const [selection, handleSelect] = useSearchParamSelect("region", "DE");

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
