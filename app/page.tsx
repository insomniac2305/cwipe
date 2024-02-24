import { getImageSet } from "@/app/lib/util";
import { getImageProps } from "next/image";
import bgImage from "@/public/start-background.jpg";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { BrandLogo } from "@/app/components/BrandLogo";
import { FaArrowRightToBracket, FaPlay } from "react-icons/fa6";

export default function Home() {
  const { props: bgImageProps } = getImageProps({
    alt: "Movie poster wall",
    src: bgImage,
  });
  const bgImageSet = getImageSet(bgImageProps.srcSet);
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-radial from-background/40 to-background to-95%">
      <div
        className="absolute left-0 top-0 -z-10 h-full w-full -rotate-6 skew-y-[18deg] bg-cover"
        style={{ backgroundImage: bgImageSet }}
      />
      <Card className="m-8">
        <CardHeader className="justify-center p-5">
          <div className="w-52">
            <BrandLogo />
          </div>
        </CardHeader>
        <CardBody className="gap-2 px-8">
          <p className="mb-2 text-center font-medium tracking-tight">
            Swipe to quickly find that movie you want to watch together!
          </p>
          <Button
            size="lg"
            href="/match"
            as={Link}
            color="primary"
            showAnchorIcon
            anchorIcon={<FaPlay />}
          >
            Start
          </Button>
          <Button
            size="md"
            href="/login"
            as={Link}
            color="default"
            showAnchorIcon
            variant="light"
            anchorIcon={<FaArrowRightToBracket />}
          >
            Login
          </Button>
        </CardBody>
      </Card>
    </main>
  );
}
