import { getMalApiBaseUrl, getMalClientId } from "@/utils/env";
import { animeDetailSchema } from "@/utils/schema";
import { generateSlug } from "@/utils/slugify";
import { redirect } from "next/navigation";

export default async function AnimeIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const clientId = getMalClientId();
  const baseUrl = getMalApiBaseUrl();

  const res = await fetch(`${baseUrl}/anime/${id}`, {
    cache: "force-cache",
    headers: { "X-MAL-CLIENT-ID": clientId },
  });

  if (!res.ok) {
    redirect(`/browse/anime`);
  }

  const json = await res.json();
  const result = animeDetailSchema.safeParse(json);

  if (!result.success) {
    redirect(`/browse/anime`);
  }

  const slug = generateSlug(result.data.title);
  redirect(`/anime/${id}/${slug}`);
}
