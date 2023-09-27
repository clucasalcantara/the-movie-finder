"use client";

import { useSearchParams } from "next/navigation";

import { useTMDB } from "@/hooks ";
import { useEffect, useMemo, useState } from "react";
import { MovieGrid } from "@/components/movie-grid ";

import type { MovieDetails } from "@/lib/types ";

export default function Home() {
  const searchParams = useSearchParams();
  const { getPopularMovies, getMoviesByGenre } = useTMDB();
  const [moviesList, setMoviesList] = useState<MovieDetails[]>([]);

  const categoryId = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const { results } = await getPopularMovies();
      setMoviesList(results);
    };

    const fetchMoviesByGenre = async () => {
      const { results } = await getMoviesByGenre(categoryId as string);
      setMoviesList(results);
    };

    if (!categoryId) {
      fetchPopularMovies();
    } else {
      fetchMoviesByGenre();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-between">
      <MovieGrid data={moviesList} />
    </section>
  );
}
