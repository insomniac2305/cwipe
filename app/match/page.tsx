import { getMovies, rateMovie } from "@/app/match/actions";
import SwipeCard from "@/app/match/swipeCard";
import Image from "next/image";

export default async function Match() {
  let movies = await getMovies();

  return (
    <ul className="relative min-h-screen">
      {movies.map((movie, index) => (
        <li className={`absolute top-0 h-full w-full`} key={movie.id}>
          <SwipeCard
            isActive={index === movies.length - 1}
            handleSwipeLeft={rateMovie.bind(null, movie.id, false)}
            handleSwipeRight={rateMovie.bind(null, movie.id, true)}
          >
            <Image
              src={`${process.env.TMDB_IMAGE_BASE_URL}/w780${movie.poster_path}`}
              fill={true}
              className="object-cover"
              alt={movie.title}
              draggable={false}
            />
          </SwipeCard>
        </li>
      ))}
    </ul>
  );
}
