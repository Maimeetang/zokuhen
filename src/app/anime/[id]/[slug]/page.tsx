import AnimeOverview from "@/components/anime/overview/anime-overview";
import { Suspense } from "react";

export default async function AnimeOverviewPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full md:max-w-5xl xl:max-w-7xl">
      <Suspense fallback={<div className="text-gray-400">loading...</div>}>
        <AnimeOverview id={id} />
      </Suspense>
    </div>
  );
}
