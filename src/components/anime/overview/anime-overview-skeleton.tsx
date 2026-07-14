export default function AnimeOverviewSkeleton() {
  const detailRows = Array.from({ length: 7 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 md:gap-4 md:space-y-0">
      <div className="space-y-4 rounded-md bg-white p-5 shadow">
        {detailRows.map((_, index) => (
          <div key={index} className="space-y-1">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="col-span-2 rounded-md bg-white p-5 shadow">
        <div className="space-y-3">
          <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
          <div className="relative aspect-video animate-pulse overflow-hidden rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
