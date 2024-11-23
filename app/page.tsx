import { getTopMovies } from "@/app/actions";
import { MainBackground } from "@/app/components/MainBackground";
import { DynamicMoviePosters } from "@/app/DynamicMoviePosters";
import { Button, Link } from "@nextui-org/react";

export default async function Home() {
  const { data: topMovies } = await getTopMovies();

  return (
    <main>
      <MainBackground>
        <div className="flex w-full max-w-screen-2xl flex-wrap items-center justify-between gap-8 p-8 md:pl-24 lg:flex-nowrap">
          <div className="flex grow flex-col items-center gap-8 md:gap-16 lg:items-start">
            <h1 className="text-center font-heading text-5xl md:text-7xl lg:text-start">
              <span className="text-7xl md:text-9xl">Cwipe</span>
              <br /> to find your <br /> movie match
            </h1>
            <div className="flex items-center gap-8">
              <Button as={Link} color="primary" size="lg" href="/login">
                Get started
              </Button>
              <p className="font-medium text-white/80">It&apos;s free!</p>
            </div>
          </div>
          <div className="flex grow justify-center">
            <DynamicMoviePosters movies={topMovies} />
          </div>
        </div>
      </MainBackground>
    </main>
  );
}
