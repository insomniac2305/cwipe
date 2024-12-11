import { ForwardedRef, forwardRef } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: forwardRef(function Image(
    props: React.JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLImageElement> &
      React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean },
    ref: ForwardedRef<HTMLImageElement>,
  ) {
    // remove Next Image fill prop to prevent warnings during tests
    const filteredProps = { ...props };
    delete filteredProps["fill"];
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...filteredProps} ref={ref} />;
  }),
  getImageProps: () => ({ props: { srcSet: "" } }),
}));
