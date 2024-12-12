import { Movie } from "@/app/lib/definitions";

export default function MovieCard({ movie }: { movie: Movie }) {
  return <div data-testid="movie-card">{movie.title}</div>;
}
