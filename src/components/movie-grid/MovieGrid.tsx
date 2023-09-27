import Link from "next/link";

import { CONSTANTS } from "@/config";

import type { MovieDetails } from "@/lib/types";
import { useAppStore } from "@/store";

import { Spinner } from "../spinner";

type MovieGridProps = {
  data: MovieDetails[];
};

export default function MovieGrid({ data }: MovieGridProps) {
  const { isLoading } = useAppStore();

  return (
    <div className="min-w-full grid grid-cols-2 lg:grid-cols-5 lg:mx-24">
      {isLoading && (
        <div className="absolute min-h-screen min-w-full flex flex-col justify-center items-center gap-3 bg-black bg-opacity-[0.8] backdrop-blur-sm">
          <Spinner />
          <span>Loading...</span>
        </div>
      )}
      {/* TODO: Virtualize this */}
      {data.map((item: any) => (
        <div key={item.id}>
          <Link href={`/movie/${item.id}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${CONSTANTS.IMAGE_BASE_URL}${item.poster_path}`}
              alt={item.original_title}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
