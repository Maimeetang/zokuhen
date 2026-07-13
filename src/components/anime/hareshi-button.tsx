import Link from "next/link";
import ExternalLinkIcon from "./external-link-icon";
import { getAnilistApiBaseUrl } from "@/utils/env";
import { anilistMediaResponseSchema } from "@/utils/schema";

const MAL_TO_ANILIST_QUERY = `
  query ($malId: Int) {
    Media(idMal: $malId, type: ANIME) {
      id
    }
  }
`;

const buttonBaseClass =
  "flex items-center justify-center gap-2 rounded-md p-2 px-5 md:w-max";

const disabledButtonClass = `${buttonBaseClass} bg-gray-200 text-white`;

const linkButtonClass =
  `${buttonBaseClass} bg-pink-400 text-white hover:bg-pink-600 outline-0 transition duration-300`;

export default async function HareshiButton({ malId }: { malId: string }) {
  try {
    const res = await fetch(getAnilistApiBaseUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: MAL_TO_ANILIST_QUERY,
        variables: { malId },
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      if (res.status === 404)
        return (
          <button className={disabledButtonClass}>
            <ExternalLinkIcon />
            Hareshi
          </button>
        );
      throw new Error(`AniList API error: ${res.status}`);
    }

    const json = await res.json();
    const result = anilistMediaResponseSchema.safeParse(json);

    if (!result.success) {
      throw new Error("Invalid AniList response");
    }

    const anilistId = result.data.data.Media?.id;

    if (!anilistId) return null;

    return (
      <Link
        className={linkButtonClass}
        href={`https://hareshi.net/browse/anime/${anilistId}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ExternalLinkIcon />
        Hareshi
      </Link>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}
