export default function AnimeRelationsSkeleton() {
  const nodes = [
    { top: "45%", left: "42%", width: "w-[180px]" },
    { top: "20%", left: "15%", width: "w-[180px]" },
    { top: "20%", left: "68%", width: "w-[180px]" },
    { top: "68%", left: "25%", width: "w-[180px]" },
    { top: "68%", left: "58%", width: "w-[180px]" },
  ];

  return (
    <div id="anime-relations" className="py-5">
      <div
        style={{ width: "100%", height: "90vh" }}
        className="relative overflow-hidden rounded-md bg-white shadow"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]" />

        {nodes.map((node, index) => (
          <div
            key={index}
            className={`absolute ${node.width} -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded border border-slate-200 bg-white shadow-sm`}
            style={{ top: node.top, left: node.left }}
          >
            <div className="aspect-2/3 w-full animate-pulse bg-gray-200" />
            <div className="space-y-1 p-2">
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-4 flex flex-col gap-1 rounded-md border border-slate-200 bg-white p-1 shadow-sm">
          <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="absolute right-4 bottom-4 h-24 w-36 animate-pulse rounded-md border border-slate-200 bg-gray-200" />
      </div>
    </div>
  );
}
