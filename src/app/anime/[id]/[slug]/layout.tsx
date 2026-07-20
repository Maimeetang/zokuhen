import type { Metadata } from "next";
import AnimeDetails from "@/components/anime/anime-details";
import AnimeDetailsSkeleton from "@/components/anime/anime-details-skeleton";
import AnimeDetailsNav from "@/components/anime/anime-details-nav";
import { getAnimeById } from "@/utils/mal";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const result = await getAnimeById(id);

  if (!result.ok) {
    return { title: "ไม่พบอนิเมะ" };
  }

  const { title, synopsis } = result.data;

  return {
    title,
    description: synopsis?.slice(0, 160) ?? `ข้อมูลและภาคต่อของ ${title}`,
  };
}

export default async function AnimePageLayout({
  params,
  children,
}: {
  params: Promise<{ id: string; slug: string }>;
  children: React.ReactNode;
}) {
  const { id, slug } = await params;

  return (
    <section>
      <Suspense fallback={<AnimeDetailsSkeleton />}>
        <AnimeDetails id={id} />
      </Suspense>
      <AnimeDetailsNav id={id} slug={slug} />
      {children}
    </section>
  );
}
