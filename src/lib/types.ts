export type Genre = {
  id: number;
  name: string;
};

export type MovieDetails = {
  original_title: string;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: string;
  budget?: number;
  genres: Record<number, Genre>;
  homepage: string;
  imdb_id: string;
  original_language: string;
  overview: string;
  poster_path: string;
  production_companies: any;
  production_countries: any;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
