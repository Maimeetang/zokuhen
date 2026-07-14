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

  const tabClass = (active: boolean) =>
    `flex-1 rounded-md px-4 py-2 text-center text-sm font-medium transition duration-300 ${
      active ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100"
    }`;

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex w-full max-w-md rounded-md bg-gray-200 p-1">
        <Link href={overviewHref} className={tabClass(isOverview)}>
          overview
        </Link>
        <Link href={relationsHref} className={tabClass(isRelations)}>
          relation
        </Link>
      </div>
    </div>
  );
}
