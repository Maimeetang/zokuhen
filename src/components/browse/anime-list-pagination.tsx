import Link from "next/link";
import type { Paging } from "@/utils/schema";

function parseMalPagingUrl(url: string) {
  const { searchParams } = new URL(url);
  return {
    query: searchParams.get("q") ?? "",
    offset: Number(searchParams.get("offset")) || 0,
  };
}

function buildBrowseUrl(query: string, offset: number) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (offset > 0) params.set("offset", String(offset));
  const qs = params.toString();
  return `/browse/anime${qs ? `?${qs}` : ""}`;
}

function browseUrlFromMalPaging(malUrl: string) {
  const { query, offset } = parseMalPagingUrl(malUrl);
  return buildBrowseUrl(query, offset);
}

type AnimeListPaginationProps = {
  paging: Paging;
};
export default function AnimeListPagination({
  paging,
}: AnimeListPaginationProps) {
  const prevHref = paging.previous
    ? browseUrlFromMalPaging(paging.previous)
    : undefined;
  const nextHref = paging.next
    ? browseUrlFromMalPaging(paging.next)
    : undefined;
  return (
    <div className="flex w-full items-center justify-between md:max-w-5xl xl:max-w-7xl">
      {prevHref ? (
        <Link
          href={prevHref}
          className="... mx-4 px-4 bg-cyan-500 text-white p-2 rounded-3xl hover:cursor-pointer"
        >
          ← หน้าก่อนหน้า
        </Link>
      ) : (
        <button className="... mx-4 px-4 bg-gray-200 text-white p-2 rounded-3xl">
          ← หน้าก่อนหน้า
        </button>
      )}
      {nextHref ? (
        <Link
          href={nextHref}
          className="... mx-4 px-4 bg-cyan-500 text-white p-2 rounded-3xl hover:cursor-pointer"
        >
          หน้าถัดไป →
        </Link>
      ) : (
        <span className="... mx-4 px-4 bg-gray-200 text-white p-2 rounded-3xl">
          หน้าถัดไป →
        </span>
      )}
    </div>
  );
}
