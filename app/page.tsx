import { MainBackground } from "@/app/components/MainBackground";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <MainBackground>
      <div className="flex w-full max-w-screen-xl flex-wrap items-center justify-between gap-16 p-8 md:p-16">
        <div className="flex grow flex-col items-center gap-8 md:gap-16">
          <h1 className="text text-center font-heading text-5xl md:text-7xl">
            Swipe to find
            <br /> your movie match
          </h1>
          <div className="flex items-center gap-8">
            <Button as={Link} color="primary" size="lg" href="/login">
              Get started
            </Button>
            <p className="font-medium text-white/80">It&apos;s free!</p>
          </div>
        </div>
        <div className="flex grow justify-center">
          <div className="relative mx-16 my-32">
            <Image
              width={300}
              height={500}
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg`}
              alt="The Wild Robot Poster"
              className="relative -left-16 -top-32 rounded-xl"
            />
            <Image
              width={300}
              height={500}
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg`}
              alt="Gladiator Poster"
              className="absolute left-0 top-0 rotate-6 rounded-xl"
            />
            <Image
              width={300}
              height={500}
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`}
              alt="Interstellar Poster"
              className="absolute left-16 top-16 rotate-12 rounded-xl"
            />
          </div>
        </div>
      </div>
    </MainBackground>
  );
}
