"use client";

import { useState } from "react";
import { useFetcher } from "alova";
import { apiClient } from "@/lib/api ";

export default function useTMDB() {
  const { fetch } = useFetcher({ force: false });
  const [isLoading, setIsLoading] = useState(false);

  return {
    getPopularMovies: async () => {
      try {
        setIsLoading(true);
        const response: any = await fetch(apiClient.Get("/movie/popular"));

        const data = await response.clone().json();

        setIsLoading(false);

        return {
          ...data,
        };
      } catch (e) {
        console.log({ e });
      }
    },
    getGenres: async () => {
      try {
        const response: any = await fetch(
          apiClient.Get("/genre/movie/list?language=en")
        );

        setIsLoading(true);

        const data = await response.clone().json();

        setIsLoading(false);

        return {
          ...data,
        };
      } catch (e) {
        console.log({ e });
      }
    },
    getMovieDetails: async (id: string) => {
      const getMovieTrailers = async (id: string) => {
        try {
          const response: any = await fetch(
            apiClient.Get(`/movie/${id}/videos`)
          );

          const data = await response.clone().json();

          return {
            ...data,
          };
        } catch (e) {
          console.log({ e });
        }
      };

      try {
        setIsLoading(true);
        const response: any = await fetch(apiClient.Get(`/movie/${id}`));
        const data = await response.clone().json();
        const trailers = await getMovieTrailers(id);

        setIsLoading(false);

        return {
          ...data,
          trailers,
        };
      } catch (e) {
        console.log({ e });
      }
    },
    getMoviesByGenre: async (id: string) => {
      try {
        setIsLoading(true);
        const response: any = await fetch(
          apiClient.Get(`/discover/movie?with_genres=${id}`)
        );

        const data = await response.clone().json();

        setIsLoading(false);

        return {
          ...data,
        };
      } catch (e) {
        console.log({ e });
      }
    },
  };
}
