"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  id: string;
  slug: string;
};

export default function AnimeDetailsNav({ id, slug }: Props) {
  const pathname = usePathname();
  const overviewHref = `/anime/${id}/${slug}`;
  const relationsHref = `/anime/${id}/${slug}/relations`;

  const isOverview = pathname === overviewHref;
  const isRelations =
    pathname === relationsHref || pathname.startsWith(`${relationsHref}/`);

  const linkClass = (active: boolean) =>
    `text-gray-500 hover:underline ${active ? "underline" : ""}`;

  return (
    <div className="flex w-full justify-center space-x-4 p-4">
      <Link href={overviewHref} className={linkClass(isOverview)}>
        overview
      </Link>
      <Link href={relationsHref} className={linkClass(isRelations)}>
        relation
      </Link>
    </div>
  );
}
