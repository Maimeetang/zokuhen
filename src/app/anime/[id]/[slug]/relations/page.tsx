import AnimeRelations from "@/components/anime/relations/anime-relations";
import AnimeRelationsSkeleton from "@/components/anime/relations/anime-relations-skeleton";
import { Suspense } from "react";

export default async function AnimeRelationsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full px-5 md:px-20">
      <Suspense fallback={<AnimeRelationsSkeleton />}>
        <AnimeRelations id={id} />
      </Suspense>
    </div>
  );
}
