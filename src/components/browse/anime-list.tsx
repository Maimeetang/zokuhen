import { getMalApiBaseUrl, getMalClientId } from "@/utils/env";
import { animeListResponseSchema } from "@/utils/schema";
import AnimeCard from "./anime-card";
import { AnimeError } from "../anime-error";
import AnimeListPagination from "./anime-list-pagination";

export default async function AnimeList({
  query,
  currentOffset,
}: {
  query: string;
  currentOffset: number;
}) {
  try {
    query = query.replaceAll(" ", "-");

    const headerText = query ? "ผลการค้นหาที่ใกล้เคียงที่สุด" : "Top Anime";
    const listContainerClass = "w-full md:max-w-5xl xl:max-w-7xl";
    const headerClass = "m-3 my-10 text-2xl font-medium text-gray-500";

    if (query.length < 3 && query.length != 0) {
      query = query.padEnd(3, "-");
    }

    const clientId = getMalClientId();
    const base_url = getMalApiBaseUrl();
    const limit = 18;
    const fields = "synopsis,genres";

    const url = query
      ? `${base_url}/anime?q=${query}&limit=${limit}&offset=${currentOffset}&fields=${fields}`
      : `${base_url}/anime/ranking?ranking_type=all&limit=${limit}&offset=${currentOffset}&fields=${fields}`;

    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: { "X-MAL-CLIENT-ID": clientId },
    });

    if (!res.ok) {
      throw new Error(`External API error: ${res.status}`);
    }

    const json = await res.json();
    const result = animeListResponseSchema.safeParse(json);

    if (!result.success) {
      throw new Error(
        `Invalid External API response: ${JSON.stringify(result.error.issues)}`,
      );
    }

    const animelist = result.data.data;
    const paging = result.data.paging;

    if (animelist.length === 0)
      return (
        <div className="flex w-full flex-col items-center">
          <div className={listContainerClass}>
            <h1 className={headerClass}>{headerText}</h1>
            <div className="flex min-h-[60vh] w-full items-center justify-center">
              <p className="text-gray-500">ไม่พบข้อมูล</p>
            </div>
          </div>
        </div>
      );

    return (
      <div className="flex w-full flex-col items-center">
        <div className={listContainerClass}>
          <h1 className={headerClass}>{headerText}</h1>
          <AnimeListPagination paging={paging} />
          <ul className="my-3 grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {animelist.map((item) => (
              <AnimeCard key={item.node.id} details={item.node} />
            ))}
          </ul>
          <AnimeListPagination paging={paging} />
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return <AnimeError />;
    }
  }
}
