import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { BrandLogo } from "@/app/components/BrandLogo";
import { FaArrowRightToBracket, FaPlay } from "react-icons/fa6";
import { MainBackground } from "@/app/components/MainBackground";

export default function Home() {
  return (
    <MainBackground>
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
    </MainBackground>
  );
}
