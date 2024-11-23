import { getTopMovies } from "@/app/actions";
import { MainBackground } from "@/app/components/MainBackground";
import { DynamicMoviePosters } from "@/app/DynamicMoviePosters";
import { Button, Divider, Link } from "@nextui-org/react";
import { FaGlobeAmericas, FaTheaterMasks } from "react-icons/fa";
import { FaHeart, FaPeopleGroup, FaVideo } from "react-icons/fa6";

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
          Find the perfect movie, Together!
        </h2>
        <p className="mb-16 text-center text-foreground/75">
          Swipe through movies with your friends and discover your next watch in
          minutes. Here&apos;s how it works:
        </p>
        <ol className="flex w-full max-w-screen-lg flex-col items-center gap-12">
          <li className="flex max-w-lg items-center justify-center gap-16 p-4">
            <div className="text-7xl text-primary">
              <FaGlobeAmericas />
            </div>
            <div>
              <h3 className="text-lg font-medium">Set the Scene</h3>
              <p className="text-foreground/75">
                Choose your language and region to unlock a tailored movie list.
              </p>
            </div>
          </li>
          <Divider className="max-w-96" />
          <li className="flex max-w-lg items-center justify-center gap-16 p-4">
            <div>
              <h3 className="text-lg font-medium">Stream Your Way</h3>
              <p className="text-foreground/75">
                Pick your go-to streaming platforms for seamless choices.
              </p>
            </div>
            <div className="text-7xl text-secondary">
              <FaVideo />
            </div>
          </li>
          <Divider className="max-w-96" />
          <li className="flex max-w-lg items-center justify-center gap-16 p-4">
            <div className="text-7xl text-success">
              <FaTheaterMasks />
            </div>
            <div>
              <h3 className="text-lg font-medium">Define Your Vibe</h3>
              <p className="text-foreground/75">
                Select your favorite genres to match your style.
              </p>
            </div>
          </li>
          <Divider className="max-w-96" />
          <li className="flex max-w-lg items-center justify-center gap-16 p-4">
            <div>
              <h3 className="text-lg font-medium">Squad Up</h3>
              <p className="text-foreground/75">
                Invite your friends and get ready to swipe together.
              </p>
            </div>
            <div className="text-7xl text-warning">
              <FaPeopleGroup />
            </div>
          </li>
          <Divider className="max-w-96" />
          <li className="flex max-w-lg items-center justify-center gap-16 p-4">
            <div className="text-7xl text-danger">
              <FaHeart />
            </div>
            <div>
              <h3 className="text-lg font-medium">Find the One</h3>
              <p className="text-foreground/75">
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
