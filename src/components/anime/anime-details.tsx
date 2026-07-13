import Image from "next/image";
import { getMalApiBaseUrl, getMalClientId } from "@/utils/env";
import { animeDetailSchema } from "@/utils/schema";
import { AnimeError } from "@/components/anime-error";
import HareshiButton from "./hareshi-button";
import MALButton from "./mal-button";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export default async function AnimeDetails({ id }: { id: string }) {
  const clientId = getMalClientId();
  const base_url = getMalApiBaseUrl();

  const fields = "synopsis,genres";
  const url = `${base_url}/anime/${id}?fields=${fields}`;

  let res: Response;
  try {
    res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: { "X-MAL-CLIENT-ID": clientId },
    });
  } catch (error) {
    console.error(error);
    return (
      <div className="bg-white p-10">
        <AnimeError />
      </div>
    );
  }

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    console.error(`External API error: ${res.status}`);
    return (
      <div className="bg-white p-10">
        <AnimeError />
      </div>
    );
  }

  let animeInfo;
  try {
    const json = await res.json();
    const result = animeDetailSchema.safeParse(json);

    if (!result.success) {
      console.error(
        `Invalid External API response: ${JSON.stringify(result.error.issues)}`,
      );
      return (
        <div className="bg-white p-10">
          <AnimeError />
        </div>
      );
    }

    animeInfo = result.data;
  } catch (error) {
    console.error(error);
    return (
      <div className="bg-white p-10">
        <AnimeError />
      </div>
    );
  }

  const imageSrc = animeInfo.main_picture?.large;

  return (
    <div className="bg-white p-10">
      <div className="mx-auto w-full md:max-w-5xl xl:max-w-7xl">
        <article className="mx-auto flex w-6/7 flex-col space-y-5 md:w-full md:flex-row md:items-start md:space-x-5 md:space-y-0">
          <div className="relative mx-auto aspect-2/3 w-full shrink-0 overflow-hidden bg-gray-200 md:mx-5 md:h-96 md:w-auto">
            {imageSrc ? (
              <Image
                src={imageSrc}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={animeInfo.title}
                className="object-cover"
                fill
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400"></div>
            )}
          </div>
          <article className="flex w-full flex-col md:min-h-96 md:flex-1">
            <h1 className="text-gray-500 text-md font-medium">
              {animeInfo.title}
            </h1>
            <br />
            <p className="line-clamp-10 text-justify text-sm text-gray-500 max-md:hidden">
              {animeInfo.synopsis}
            </p>
            <br className="hidden lg:block" />
            <div className="mt-auto flex flex-col gap-2 pt-4 md:flex-row">
              <MALButton malId={animeInfo.id} />
              <Suspense
                fallback={
                  <button className="flex md:w-max justify-center rounded-md bg-gray-200 p-2 px-5 text-white">
                    Hareshi
                  </button>
                }
              >
                <HareshiButton malId={id} />
              </Suspense>
            </div>
          </article>
        </article>
      </div>
    </div>
  );
}
