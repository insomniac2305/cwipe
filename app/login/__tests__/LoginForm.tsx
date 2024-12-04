import { expect, it, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginForm from "@/app/login/components/LoginForm";

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({ get: () => "" }),
}));

vi.mock("react-dom", () => ({
  useFormState: () => [undefined, ""],
  useFormStatus: () => ({ pending: false }),
}));

describe("Login Form", () => {
  it("renders name input", () => {
    render(<LoginForm />);

    const input = screen.getByRole("textbox", { name: /your name/i });

    expect(input).toBeInTheDocument();
  });

  // it("calls anonymous sign in when form submits") -> Wait for stable React release to have extended form element available for vitest
  // it("displays error message when returned after submit") -> Wait for stable React release to have extended form element available for vitest
  // https://github.com/vercel/next.js/issues/63868#issuecomment-2094149703
});
