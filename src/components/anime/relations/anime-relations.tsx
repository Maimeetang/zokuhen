import { getMalApiBaseUrl, getMalClientId } from "@/utils/env";
import { animeWithRelationsResponseSchema } from "@/utils/schema";
import AnimeRelationsFlow from "./anime-relations-flow";

export default async function AnimeRelations({ id }: { id: number }) {
  const clientId = getMalClientId();
  const base_url = getMalApiBaseUrl();

  let res: Response;
  try {
    res = await fetch(`${base_url}/anime/${id}?fields=related_anime`, {
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
  const result = animeWithRelationsResponseSchema.safeParse(json);

  if (!result.success) {
    console.error(JSON.stringify(result.error.issues));
    return null;
  }

  return (
    <div id="anime-relations" className="py-5">
      <AnimeRelationsFlow animeWithRelations={result.data} />
    </div>
  );
}
