import { ForwardedRef, forwardRef } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: forwardRef(function Image(
    props: React.JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLImageElement> &
      React.ImgHTMLAttributes<HTMLImageElement>,
    ref: ForwardedRef<HTMLImageElement>,
  ) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} ref={ref} />;
  }),
  getImageProps: () => ({ props: { srcSet: "" } }),
}));
