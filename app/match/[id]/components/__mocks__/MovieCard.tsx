import { Movie } from "@/app/lib/definitions";

export default function MovieCard({
  movie,
  isLiked,
}: {
  movie: Movie;
  isLiked?: boolean;
}) {
  return (
    isLiked === undefined && <div data-testid="movie-card">{movie.title}</div>
  );
}
