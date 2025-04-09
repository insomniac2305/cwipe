import type { Selection } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function useSearchParamSelect(
  paramName: string,
  defaultValue = "",
): [Selection, (keys: Selection) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selection, setSelection] = useState<Selection>(
    new Set([searchParams.get(paramName) || defaultValue]),
  );

  const handleSelect = (keys: Selection) => {
    setSelection(keys);

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const values = Array.from(keys);

    if (!values[0]) {
      params.delete(paramName);
    } else {
      params.set(paramName, values[0].toString());
    }

    const search = params.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return [selection, handleSelect];
}
