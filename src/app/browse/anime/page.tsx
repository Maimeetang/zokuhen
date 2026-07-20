import type { Metadata } from "next";
import AnimeList from "@/components/browse/anime-list";
import AnimeListSkeleton from "@/components/browse/anime-list-skeleton";
import Search from "@/components/search";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ค้นหาอนิเมะ",
  description: "ค้นหาอนิเมะด้วยชื่ออังกฤษ โรมันจิ หรือภาษาญี่ปุ่น",
};

export default async function BrowseAnimePage(props: {
  searchParams?: Promise<{
    query?: string;
    offset?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentOffset = Number(searchParams?.offset) || 0;

  return (
    <>
      <div className="flex m-4 mx-auto w-full md:max-w-5xl xl:max-w-7xl px-5">
        <Search placeholder="พิมพ์ชื่อเรื่องได้ที่นี่ (eng, romanji, 日本語)" />
      </div>
      <Suspense key={query + currentOffset} fallback={<AnimeListSkeleton />}>
        <AnimeList query={query} currentOffset={currentOffset} />
      </Suspense>
    </>
  );
}
