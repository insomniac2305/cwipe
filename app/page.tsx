import { getTopMovies } from "@/app/actions";
import { MainBackground } from "@/app/components/MainBackground";
import { DynamicMoviePosters } from "@/app/DynamicMoviePosters";
import { Button, Divider, Link } from "@nextui-org/react";
import {
  FaEarthAmericas,
  FaHeart,
  FaMasksTheater,
  FaPeopleGroup,
  FaPlay,
} from "react-icons/fa6";

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
              <p className="font-medium text-foreground/75">It&apos;s free!</p>
            </div>
          </div>
          <div className="flex grow justify-center">
            <DynamicMoviePosters movies={topMovies} />
          </div>
        </div>
      </MainBackground>
      <div className="flex flex-col items-center gap-4 p-8 md:p-16">
        <h2 className="text-center font-heading text-3xl">
          Don&apos;t know what to watch together?
        </h2>
        <p className="mb-16 text-center text-foreground/75">
          Swipe your way to the perfect movie for you and your friends in just a
          few steps! Here&apos;s how it works:
        </p>
        <ol className="flex w-full max-w-screen-lg flex-col items-center gap-12">
          <li className="flex max-w-lg flex-col items-center justify-center gap-6 p-4 sm:flex-row sm:gap-16">
            <div className="text-7xl text-primary">
              <FaEarthAmericas />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-center text-lg font-medium sm:text-start">
                Set the Scene
              </h3>
              <p className="text-center text-foreground/75 sm:text-start">
                Choose your language and region to determine which streaming
                providers and movies are available to you.
              </p>
            </div>
          </li>
          <Divider className="max-w-96" />
          <li className="flex max-w-lg flex-col-reverse items-center justify-center gap-6 p-4 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-1">
              <h3 className="text-center text-lg font-medium sm:text-start">
                Streamline the Choices
              </h3>
              <p className="text-center text-foreground/75 sm:text-start">
                Select your favorite streaming providers so all recommendations
                are at your fingertips.
              </p>
            </div>
            <div className="text-7xl text-secondary">
              <FaPlay />
            </div>
          </li>
          <Divider className="max-w-96" />
          <li className="flex max-w-lg flex-col items-center justify-center gap-6 p-4 sm:flex-row sm:gap-16">
            <div className="text-7xl text-success">
              <FaMasksTheater />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-center text-lg font-medium sm:text-start">
                Check Your Vibe
              </h3>
              <p className="text-center text-foreground/75 sm:text-start">
                Pick your favorite genres and let us curate a selection
                you&apos;ll love.
              </p>
            </div>
          </li>
          <Divider className="max-w-96" />
          <li className="flex max-w-lg flex-col-reverse items-center justify-center gap-6 p-4 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-1">
              <h3 className="text-center text-lg font-medium sm:text-start">
                Squad Up
              </h3>
              <p className="text-center text-foreground/75 sm:text-start">
                Invite your friends and get ready to swipe together.
              </p>
            </div>
            <div className="text-7xl text-warning">
              <FaPeopleGroup />
            </div>
          </li>
          <Divider className="max-w-96" />
          <li className="flex max-w-lg flex-col items-center justify-center gap-6 p-4 sm:flex-row sm:gap-16">
            <div className="text-7xl text-danger">
              <FaHeart />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-center text-lg font-medium sm:text-start">
                Find the One
              </h3>
              <p className="text-center text-foreground/75 sm:text-start">
                Swipe, match, and discover the movie everyone&apos;s excited
                about!
              </p>
            </div>
          </li>
        </ol>
      </div>
    </main>
  );
}
