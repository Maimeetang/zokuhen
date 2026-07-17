import { cache } from "react";
import { getMalApiBaseUrl, getMalClientId } from "@/utils/env";
import { animeFullSchema, type AnimeFull } from "@/utils/schema";

const ANIME_FIELDS = [
  "synopsis",
  "genres",
  "media_type",
  "num_episodes",
  "status",
  "start_date",
  "end_date",
  "studios",
  "source",
  "videos",
  "related_anime",
].join(",");

export type GetAnimeByIdResult =
  | { ok: true; data: AnimeFull }
  | { ok: false; status: number }
  | { ok: false; error: "network" | "parse" };

export const getAnimeById = cache(
  async (id: string): Promise<GetAnimeByIdResult> => {
    const clientId = getMalClientId();
    const baseUrl = getMalApiBaseUrl();
    const url = `${baseUrl}/anime/${id}?fields=${ANIME_FIELDS}`;

    let res: Response;
    try {
      res = await fetch(url, {
        next: { revalidate: 86400 },
        headers: { "X-MAL-CLIENT-ID": clientId },
      });
    } catch (error) {
      console.error(error);
      return { ok: false, error: "network" };
    }

    if (!res.ok) {
      return { ok: false, status: res.status };
    }

    try {
      const json = await res.json();
      const result = animeFullSchema.safeParse(json);

      if (!result.success) {
        console.error(
          `Invalid MAL API response: ${JSON.stringify(result.error.issues)}`,
        );
        return { ok: false, error: "parse" };
      }

      return { ok: true, data: result.data };
    } catch (error) {
      console.error(error);
      return { ok: false, error: "network" };
    }
  },
);
