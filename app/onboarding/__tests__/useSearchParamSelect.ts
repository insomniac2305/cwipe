import { Key } from "@react-types/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useSearchParamSelect } from "@/app/onboarding/lib/useSearchParamSelect";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
  usePathname: vi.fn().mockReturnValue("/testPath"),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

const mockParamName = "testParam";
const mockParamValue = "testValue";

describe("useSearchParamSelect", () => {
  beforeEach(() => {
    vi.mocked(useRouter().push).mockClear();
  });

  it("sets the selection when handleSelect is called", () => {
    const { result } = renderHook(() => useSearchParamSelect(mockParamName));

    const [, handleSelect] = result.current;
    const mockSelection = new Set([mockParamValue]);
    act(() => handleSelect(mockSelection));

    const [actualSelection] = result.current;
    expect(actualSelection).toEqual(mockSelection);
  });

  it("sets the search param when handleSelect is called", () => {
    const { result } = renderHook(() => useSearchParamSelect(mockParamName));

    const [, handleSelect] = result.current;
    const mockSelection = new Set([mockParamValue]);
    act(() => handleSelect(mockSelection));

    const paramPattern = new RegExp(`${mockParamName}=${mockParamValue}`, "i");

    expect(useRouter().push).toHaveBeenCalledWith(
      expect.stringMatching(paramPattern),
    );
  });

  it("deletes the search param when handleSelect with no selection", () => {
    const { result } = renderHook(() => useSearchParamSelect(mockParamName));

    const [, handleSelect] = result.current;
    const mockSelection = new Set<Key>();
    act(() => handleSelect(mockSelection));

    const paramPattern = new RegExp(`${mockParamName}=`, "i");

    expect(useRouter().push).not.toHaveBeenCalledWith(
      expect.stringMatching(paramPattern),
    );
  });
});
