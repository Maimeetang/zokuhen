"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { generateSlug } from "@/utils/slugify";

type AnimeNode = Node<
  {
    anime: {
      id: number;
      title: string;
      picture: string;
    };
    relationType?: string;
    relationTypeFormatted?: string;
  },
  "anime"
>;

export default function AnimeRelationsNode({ data }: NodeProps<AnimeNode>) {
  const router = useRouter();
  const { anime, relationType, relationTypeFormatted } = data;
  const badgeLabel =
    relationTypeFormatted || relationType?.replaceAll("_", " ");

  const isMainNode = !relationType && !relationTypeFormatted;

  return (
    <div
      className={[
        "relative w-[180px] overflow-hidden rounded bg-white text-black shadow-sm cursor-pointer transition hover:-translate-y-1 hover:scale-105",
        isMainNode
          ? "border-2 border-green-500 ring-2 ring-green-200"
          : "border border-slate-200",
      ].join(" ")}
      onClick={() =>
        router.push(`/anime/${anime.id}/${generateSlug(anime.title)}/relations`)
      }
    >
      <Handle type="target" position={Position.Left} />
      {badgeLabel && (
        <span className="absolute top-2 left-2 z-10 rounded bg-green-500 ring-2 ring-green-200 px-1.5 py-0.5 text-[10px] font-semibold text-white capitalize">
          {badgeLabel}
        </span>
      )}
      <div className="relative aspect-2/3 w-full bg-slate-100">
        {anime.picture ? (
          <Image
            src={anime.picture}
            alt={anime.title}
            fill
            className="object-cover"
            sizes="180px"
          />
        ) : null}
      </div>
      <div className="p-2 text-xs text-gray-500">{anime.title}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
