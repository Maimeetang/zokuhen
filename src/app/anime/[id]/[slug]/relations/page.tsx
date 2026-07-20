import type { Metadata } from "next";
import AnimeRelations from "@/components/anime/relations/anime-relations";
import AnimeRelationsSkeleton from "@/components/anime/relations/anime-relations-skeleton";
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

  const { title } = result.data;

  return {
    title: `${title} - ความสัมพันธ์`,
    description: `ดูภาคก่อน ภาคต่อ และเรื่องที่เกี่ยวข้องของ ${title}`,
  };
}

export default async function AnimeRelationsPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full px-4 md:max-w-5xl xl:max-w-7xl">
      <Suspense fallback={<AnimeRelationsSkeleton />}>
        <AnimeRelations id={id} height={70} />
      </Suspense>
    </div>
  );
}
