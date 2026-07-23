import AnimeOverview from "@/components/anime/overview/anime-overview";
import AnimeOverviewSkeleton from "@/components/anime/overview/anime-overview-skeleton";
import ScrollToTop from "@/utils/scroll-to-top";
import { Suspense } from "react";

export default async function AnimeOverviewPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full px-4 md:max-w-5xl xl:max-w-7xl">
      <ScrollToTop />
      <Suspense fallback={<AnimeOverviewSkeleton />}>
        <AnimeOverview id={id} />
      </Suspense>
    </div>
  );
}
