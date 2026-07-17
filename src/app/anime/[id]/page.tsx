import { getAnimeById } from "@/utils/mal";
import { generateSlug } from "@/utils/slugify";
import { redirect } from "next/navigation";

export default async function AnimeIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getAnimeById(id);

  if (!result.ok) {
    redirect("/browse/anime");
  }

  const slug = generateSlug(result.data.title);
  redirect(`/anime/${id}/${slug}`);
}
