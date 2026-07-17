import AnimeRelations from "@/components/anime/relations/anime-relations";
import AnimeRelationsSkeleton from "@/components/anime/relations/anime-relations-skeleton";
import { Suspense } from "react";

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
