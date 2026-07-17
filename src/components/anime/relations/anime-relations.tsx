import { getAnimeById } from "@/utils/mal";
import AnimeRelationsFlow from "./anime-relations-flow";

export default async function AnimeRelations({
  id,
  height,
}: {
  id: string;
  height: number;
}) {
  const result = await getAnimeById(id);

  if (!result.ok) {
    console.error(
      "status" in result
        ? `External API error: ${result.status}`
        : `External API error: ${result.error}`,
    );
    return null;
  }

  const anime = result.data;

  return (
    <div id="anime-relations" className="py-5">
      <AnimeRelationsFlow
        animeWithRelations={{
          id: anime.id,
          title: anime.title,
          main_picture: anime.main_picture,
          related_anime: anime.related_anime ?? [],
        }}
        height={height}
      />
    </div>
  );
}
