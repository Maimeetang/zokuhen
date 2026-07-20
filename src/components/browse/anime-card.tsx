"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimeDetail } from "@/utils/schema";
import { generateSlug } from "@/utils/slugify";

export default function AnimeCard({ details }: { details: AnimeDetail }) {
  const imageSrc = details.main_picture?.large;
  const slug = generateSlug(details.title);
  const genres = details.genres?.slice(0, 2) ?? [];

  return (
    <Link
      className="group m-3 flex h-72 overflow-hidden rounded-md bg-white shadow transition hover:-translate-y-1 hover:scale-105"
      href={`/anime/${details.id}/${slug}`}
      onNavigate={() => window.document.scrollingElement?.scrollTo(0, 0)}
    >
      <div className="relative h-full aspect-2/3 shrink-0 overflow-hidden bg-gray-200">
        {imageSrc ? (
          <Image
            src={imageSrc}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={details.title}
            className="object-cover"
            fill
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400"></div>
        )}
      </div>

      <div className="flex flex-col justify-between">
        <article className="p-3">
          <h1 className="text-gray-500 font-medium">{details.title}</h1>
          <br />
          <p className="line-clamp-6 text-xs font-medium text-gray-400">
            {details.synopsis}
          </p>
        </article>
        {genres.length > 0 ? (
          <div className="flex flex-nowrap gap-1 overflow-hidden bg-gray-200 p-2">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="max-w-[48%] shrink truncate rounded-2xl bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700"
              >
                {genre.name}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
