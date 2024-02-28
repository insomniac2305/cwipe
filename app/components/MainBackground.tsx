import { getImageSet } from "@/app/lib/util";
import { getImageProps } from "next/image";
import bgImage from "@/public/start-background.jpg";

export function MainBackground({ children }: { children: React.ReactNode }) {
  const { props: bgImageProps } = getImageProps({
    alt: "Movie poster wall",
    src: bgImage,
  });
  const bgImageSet = getImageSet(bgImageProps.srcSet);
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-radial from-background/40 to-background to-95%">
      <div
        className="absolute left-0 top-0 -z-10 h-full w-full -rotate-6 skew-y-[18deg] bg-cover"
        style={{
          backgroundImage: bgImageSet,
        }}
      />
      {children}
    </main>
  );
}
