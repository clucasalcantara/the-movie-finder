import Link from "next/link";

import type { MovieDetails } from "@/lib/types ";

type MovieGridProps = {
  data: MovieDetails[];
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function MovieGrid({ data }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 lg:mx-24">
      {/* TODO: Virtualize this */}
      {data.map((item: any) => (
        <div key={item.id}>
          <Link href={`/movie/${item.id}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMAGE_BASE_URL}${item.poster_path}`}
              alt={item.original_title}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
