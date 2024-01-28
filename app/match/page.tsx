import { getMovies } from "@/app/match/actions";
import Image from "next/image";

export default async function Match() {
  const movies = await getMovies();

  return (
    <ul className="relative min-h-screen">
      {movies.map((movie, index) => (
        <li className={`absolute top-0 h-full w-full bg-slate-400 ${index === 0 ? "z-10" : "z-0"}`} key={movie.id}>
          <Image
            src={`${process.env.TMDB_IMAGE_BASE_URL}/w780${movie.poster_path}`}
            fill={true}
            className="object-cover"
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  );
}
