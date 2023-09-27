"use client";

export default function useFavorites(id: string) {
  const checkFavoriteStatus = async () => {
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];

      const isFavorite = parsedFavorites.includes(id);

      return isFavorite;
    }
  };

  const addMovieToFavorites = async () => {
    if (typeof window !== "undefined") {
      const favorites = await localStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];

      parsedFavorites.push(id);

      return localStorage.setItem("favorites", JSON.stringify(parsedFavorites));
    }
  };

  const removeMovieFromFavorites = async () => {
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];

      const filteredItems = parsedFavorites.filter(
        (favorite: any) => favorite !== id
      );

      return localStorage.setItem("favorites", JSON.stringify(filteredItems));
    }
  };

  return {
    checkFavoriteStatus,
    addMovieToFavorites,
    removeMovieFromFavorites,
  };
}
