export default function AnimeDetailsSkeleton() {
  return (
    <div className="bg-white p-10">
      <div className="mx-auto w-full md:max-w-5xl xl:max-w-7xl">
        <article className="mx-auto flex w-2/3 flex-col space-y-5 md:w-full md:flex-row md:items-start md:space-x-5 md:space-y-0">
          <div className="relative mx-auto aspect-2/3 w-full shrink-0 animate-pulse overflow-hidden bg-gray-200 md:mx-5 md:h-96 md:w-auto" />

          <article className="flex w-full flex-col md:min-h-96 md:flex-1">
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 hidden space-y-2 md:block">
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-4/6 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="mt-auto flex gap-2 pt-4">
              <div className="h-9 w-28 animate-pulse rounded-md bg-gray-200" />
              <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200" />
            </div>
          </article>
        </article>
      </div>
    </div>
  );
}
