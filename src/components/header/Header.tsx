"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
// Hooks
import { useTMDB } from "@/hooks";
// SVGs
import { AiOutlineMore, AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

import type { Genre } from "@/lib/types";

export default function Header() {
  const { slug } = useParams() || {};
  const searchParams = useSearchParams();
  const { back } = useRouter();
  const { getGenres } = useTMDB();
  const [genresList, setGenresList] = useState<Genre[]>([]);
  const [shouldOpenGenresList, setShouldOpenGenresList] = useState(false);

  const categoryId = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );
  const category: Genre = genresList.find(
    (genre: any) => genre.id == categoryId
  ) as any;

  const isMovieDetail = !!slug && !category;

  const categoryTitle = isMovieDetail
    ? "Movie Details"
    : category?.name ?? "Popular Movies";

  useEffect(() => {
    const fetchMoviesGenres = async () => {
      const { genres } = await getGenres();
      setGenresList(genres);
    };

    fetchMoviesGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="z-10">
      <nav className="bg-[#212121] min-h-[64px] flex items-center p-4 w-full shadow-2xl sticky">
        <div className="flex items-center justify-between w-full">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => isMovieDetail && back()}
          >
            {isMovieDetail && <BsArrowLeft />}
            <h1 className="font-roboto font-700 line-height-[24px]">
              {categoryTitle}
            </h1>
          </div>
          <div
            className="self-end"
            onClick={() => setShouldOpenGenresList(true)}
          >
            <AiOutlineMore size={28} />
          </div>
        </div>
      </nav>
      {shouldOpenGenresList && (
        <div className="max-h-[400px] min-w-full bg-[#212121] left-0 top-0 absolute overflow-auto">
          <div className="bg-[#212121] pb-4 px-4 flex justify-between items-center fixed w-full py-4">
            <h1 className="font-roboto font-bold text-2xl">Genres</h1>
            <AiOutlineClose
              className="self-end"
              size={28}
              onClick={() => setShouldOpenGenresList(false)}
            />
          </div>
          <div className="mt-4 p-4 pb-4 gap-4 flex flex-col">
            {genresList.map((genre: Genre) => (
              <Link
                onClick={() => setShouldOpenGenresList(false)}
                key={genre.id}
                href={{
                  pathname: "/",
                  query: { category: genre.id },
                }}
              >
                <span className="text-sm">{genre.name}</span>
              </Link>
            ))}
            <Link
              onClick={() => setShouldOpenGenresList(false)}
              href={{
                pathname: "/",
              }}
            >
              <span className="text-sm">All</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
