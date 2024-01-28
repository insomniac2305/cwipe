import { DiscoverMovies } from "@/app/lib/definitions";

export async function getMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_API_TOKEN,
    },
  };

  const response = await fetch(
    process.env.TMDB_API_URL +
      "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  );
  const data: DiscoverMovies = await response.json();
  return data.results;
}
