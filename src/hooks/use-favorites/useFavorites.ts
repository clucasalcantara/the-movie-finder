"use client";

import { useEffect } from "react";

/**
 * @name parseFavoritesFromStorage
 * @returns Promise<parsed favorites from localStorage>
 */
const parseFavoritesFromStorage = async () => {
  const favorites = await localStorage.getItem("favorites");
  const parsedFavorites = favorites ? JSON.parse(favorites) : [];

  return parsedFavorites;
};

/**
 * @name ensureExecutionInsideWindow
 * @returns throws error if window is not defined
 */
const ensureExecutionInsideWindow = () => {
  if (typeof window !== "undefined") {
    return;
  }

  console.info(
    "Are you outside client (browser)? Window is not defined therefore neither is localStorage"
  );

  throw new Error("Window is not defined");
};

export default function useFavorites(id: string) {
  useEffect(() => {
    ensureExecutionInsideWindow();
  }, []);

  return {
    checkFavoriteStatus: async () => {
      const favorites = localStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];

      const isFavorite = parsedFavorites.includes(id);

      return isFavorite;
    },
    addMovieToFavorites: () => async () => {
      const favorites = await parseFavoritesFromStorage();

      favorites.push(id);

      return localStorage.setItem("favorites", JSON.stringify(favorites));
    },
    removeMovieFromFavorites: async () => {
      const favorites = await parseFavoritesFromStorage();

      const filteredItems = favorites.filter(
        (favorite: any) => favorite !== id
      );

      return localStorage.setItem("favorites", JSON.stringify(filteredItems));
    },
  };
}
