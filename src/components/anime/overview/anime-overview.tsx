import { getMalApiBaseUrl, getMalClientId } from "@/utils/env";
import {
  formatAired,
  formatMediaType,
  formatSource,
  formatStatus,
  getLatestVideo,
  getYoutubeEmbedUrl,
} from "@/utils/format-mal";
import { animeDetailSchema } from "@/utils/schema";

export default async function AnimeOverview({ id }: { id: string }) {
  const clientId = getMalClientId();
  const base_url = getMalApiBaseUrl();

  const fields =
    "media_type,num_episodes,status,start_date,end_date,studios,source,genres,videos";
  const url = `${base_url}/anime/${id}?fields=${fields}`;

  let res: Response;
  try {
    res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: { "X-MAL-CLIENT-ID": clientId },
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  if (!res.ok) {
    console.error(`External API error: ${res.status}`);
    return null;
  }

  const json = await res.json();
  const result = animeDetailSchema.safeParse(json);

  if (!result.success) {
    console.error(JSON.stringify(result.error.issues));
    return null;
  }

  const anime = result.data;
  const latestVideo = getLatestVideo(anime.videos);
  const embedUrl = latestVideo ? getYoutubeEmbedUrl(latestVideo.url) : null;
  const studios = anime.studios?.map((s) => s.name).join(", ");
  const genres = anime.genres?.map((g) => g.name).join(", ");

  function DetailRow({
    label,
    value,
  }: {
    label: string;
    value: string | null | undefined;
  }) {
    if (!value) return null;

    return (
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="space-y-4 rounded-md bg-white p-5 shadow">
        <DetailRow label="Type" value={formatMediaType(anime.media_type)} />
        <DetailRow label="Episodes" value={anime.num_episodes?.toString()} />
        <DetailRow label="Status" value={formatStatus(anime.status)} />
        <DetailRow
          label="Aired"
          value={formatAired(anime.start_date, anime.end_date)}
        />
        <DetailRow label="Studios" value={studios} />
        <DetailRow label="Source" value={formatSource(anime.source)} />
        <DetailRow label="Genre" value={genres} />
      </div>
      <div className="rounded-md bg-white p-5 shadow col-span-2">
        {embedUrl && latestVideo ? (
          <div className="space-y-3">
            <p className="font-medium text-gray-700">ตัวอย่างอนิเมะ</p>
            <div className="relative aspect-video overflow-hidden rounded-md bg-gray-200">
              <iframe
                src={embedUrl}
                title={latestVideo.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No PV available</p>
        )}
      </div>
    </div>
  );
}
