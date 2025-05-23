import { User } from "next-auth";

export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface Region {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface WatchRegionsApi {
  results: Region[];
}

export interface WatchProvider {
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

export interface WatchProvidersApi {
  results: WatchProvider[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreApi {
  genres: Genre[];
}

export interface DiscoverMovies {
  page: number;
  results: Array<{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>;
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  "watch/providers": {
    results: {
      [countryCode: string]: {
        link: string;
        flatrate?: WatchProvider[];
        rent?: WatchProvider[];
        buy?: WatchProvider[];
      };
    };
  };
  credits: {
    cast: Array<{
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path?: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }>;
    crew: Array<{
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
    }>;
  };
}

export interface Movie {
  genres: Genre[];
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  watch_providers?: MovieDetails["watch/providers"]["results"][string];
  cast: MovieDetails["credits"]["cast"];
}

export interface MovieMatch extends Movie {
  last_rated_at: Date;
}

export type SwipeDirection = "left" | "right";

export interface SwipeCardRef {
  swipe: (direction: SwipeDirection, shouldHandleSwipe?: boolean) => void;
  undoSwipe: () => void;
}
export type FlattenedValidationErrors = {
  formErrors: string[];
  fieldErrors: {
    [field: string]: string[] | undefined;
  };
};
export interface FormState {
  errors?: FlattenedValidationErrors;
}

export interface MatchSessionUser extends User {
  is_host?: boolean;
}

export type MatchSession = {
  id: string;
  providers: number[];
  genres: number[];
  users: MatchSessionUser[];
  is_started: boolean;
  match_count: number;
};

export type GetResult<T> = Promise<
  | {
      data: T;
      error?: undefined;
    }
  | {
      data?: undefined;
      error: { message: string };
    }
>;
