import { getMovies } from "@/app/match/actions";
import MovieStack from "@/app/match/movieStack";

export default async function Match() {
  let movies = await getMovies();

  return <MovieStack movies={movies} />;
}
