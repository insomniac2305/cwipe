import { ShareButton } from "@/app/match/[id]/components/ShareButton";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach } from "node:test";
import { describe, expect, it, vi } from "vitest";

describe("Share Button", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("shares match session link when clicked and share function is defined", () => {
    vi.stubGlobal("navigator", {
      share: vi.fn(),
    });
    render(<ShareButton id="1" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(navigator.share).toHaveBeenCalledWith(
      expect.objectContaining({ url: expect.stringMatching(/match\/1/i) }),
    );
  });

  it("copies match session link to clipboard when clicked and share function is not defined", () => {
    vi.stubGlobal("navigator", {
      share: undefined,
      clipboard: { writeText: vi.fn() },
    });

    render(<ShareButton id="1" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringMatching(/match\/1/i),
    );
  });

  it("renders confirmation when match session link is copied to clipboard", () => {
    vi.stubGlobal("navigator", {
      share: undefined,
      clipboard: { writeText: vi.fn() },
    });

    render(<ShareButton id="1" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const confirmation = screen.getByText(/link copied/i);

    expect(confirmation).toBeInTheDocument();
  });
});
