import { AnimeCardSkeleton } from "./anime-card-skeleton";

const SKELETON_COUNT = 6;

export default function AnimeListSkeleton() {
  return (
    <div className="flex w-full justify-center">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 md:max-w-5xl xl:grid-cols-3 xl:max-w-7xl">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <AnimeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
