import "@/app/__mocks__/intersectionObserver";
import Home from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders link to login page", async () => {
    const page = await Home();
    render(page);

    const heading = screen.getByRole("button", { name: "Get started" });

    expect(heading).toHaveAttribute("href", "/login");
  });
});
