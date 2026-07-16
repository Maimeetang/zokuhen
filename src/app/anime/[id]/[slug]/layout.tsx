import AnimeDetails from "@/components/anime/anime-details";
import AnimeDetailsSkeleton from "@/components/anime/anime-details-skeleton";
import AnimeDetailsNav from "@/components/anime/anime-details-nav";
import { Suspense } from "react";

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
        <AnimeDetailsNav id={id} slug={slug} />
      </Suspense>
      {children}
    </section>
  );
}
