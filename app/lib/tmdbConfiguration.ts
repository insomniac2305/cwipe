export const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TMDB_API_TOKEN,
  },
  next: { revalidate: 3600 },
};

export const TMDB_PAGE_LIMIT = 500;
