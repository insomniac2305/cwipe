import { getMovies } from "@/app/sessions/[id]/actions";
import MovieStack from "@/app/sessions/[id]/movieStack";

export default async function Session() {
  const movies = await getMovies();

  return <MovieStack movies={movies} />;
}
