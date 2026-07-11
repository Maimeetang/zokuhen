export function AnimeCardSkeleton() {
  return (
    <div className="m-4 flex h-72 overflow-hidden rounded-md bg-white shadow">
      <div className="aspect-2/3 h-full shrink-0 animate-pulse bg-gray-200" />

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
