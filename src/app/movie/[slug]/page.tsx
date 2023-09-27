"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
// SVGs
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// Config
import { CONSTANTS } from "@/config";
import { useTMDB, useFavorites } from "@/hooks";
import { Spinner } from "@/components/spinner";

import type { MovieDetails } from "@/lib/types";
import next from "next";

type MovieDetailsProps = MovieDetails & {
  isFavorite?: boolean;
  trailers: any;
};

export default function Movie() {
  const { slug } = useParams() || {};
  const { getMovieDetails } = useTMDB();
  const { checkFavoriteStatus, addMovieToFavorites, removeMovieFromFavorites } =
    useFavorites(slug as string);
  const [movieDetails, setMovieDetails] = useState({} as MovieDetailsProps);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (slug) {
        const data = await getMovieDetails(slug as string);
        const isFavorite = await checkFavoriteStatus();

        setMovieDetails({
          ...data,
          isFavorite,
        });
      }
    };

    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const checkIsFavorited = async () => {
      const isFavorite = await checkFavoriteStatus();

      setMovieDetails({
        ...movieDetails,
        isFavorite,
      });
    };

    if (!isLoading) {
      checkIsFavorited();
    }
  }, [movieDetails.isFavorite, isLoading, checkFavoriteStatus, movieDetails]);

  const { trailers: { id = "", results: movieTrailers = [] } = {} } =
    movieDetails || {};

  const handleFavoriteAction = async () => {
    setIsLoading(true);

    const favoriteCallback = movieDetails.isFavorite
      ? removeMovieFromFavorites
      : addMovieToFavorites;

    await favoriteCallback();

    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#746A64] min-h-[56px] flex items-center justify-between px-4 shadow-lg">
        <h1 className="font-roboto line-height-[24px] font-500">
          {movieDetails.original_title}
        </h1>
        {movieDetails.isFavorite ? (
          <AiFillHeart className="text-[red]" size={30} />
        ) : (
          <AiOutlineHeart size={30} />
        )}
      </div>
      <div className="flex flex-col justify-between text-black">
        <div className="p-4 flex flex-row justify-between gap-4">
          <div className="min-w-[150px] rounded-md shadow-lg">
            {movieDetails.poster_path ? (
              <Image
                width={150}
                height={225}
                src={`${CONSTANTS.IMAGE_BASE_URL}${movieDetails.poster_path}`}
                alt={movieDetails.original_title}
                className="rounded-md"
              />
            ) : (
              <div className="h-[225px] w-[150px] flex justify-center items-center bg-[#746A64] rounded-md bg-opacity-30">
                <Spinner />
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="font-roboto font-400 text-[#212121] text-2xl">
                  {dayjs(movieDetails.release_date).format("YYYY")}
                </h2>
                <span className="italic">{movieDetails.runtime} mins</span>
              </div>
              <div>
                <span className="font-bold font-roboto">
                  {movieDetails.vote_average?.toFixed(1)}/10
                </span>
                <div
                  className="bg-[#746A64] rounded-md flex items-center justify-center min-h-[56px] mt-6 self-end shadow-md cursor-pointer"
                  onClick={() => handleFavoriteAction()}
                >
                  <span className="text-white font-roboto font-500 text-[16px]">
                    {!isLoading ? (
                      `${
                        movieDetails.isFavorite ? "Remove from" : "Add to"
                      } favorites`
                    ) : (
                      <Spinner />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#757575] font-roboto font-500 text-[14px] text-justify">
          {movieDetails.overview}
        </p>
      </div>
      {movieDetails.trailers?.results.length > 0 && (
        <div className="w-full p-4 font-roboto font-500 text-[#757575] uppercase">
          <div className="border-b-[1px] border-[#DEDEDE]">
            <h1 className="pb-2">Trailers</h1>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {movieTrailers.map((trailer: any) => (
              <Link
                key={trailer.id}
                className="bg-[#FAFAFA] rounded-md p-[14px] flex items-center justify-between gap-4 shadow-sm"
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
              >
                <HiOutlinePlayCircle size={30} />
                <span className="w-full capitalize">{trailer.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
