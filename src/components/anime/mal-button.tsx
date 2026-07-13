import Link from "next/link";
import ExternalLinkIcon from "./external-link-icon";

const buttonBaseClass =
  "flex items-center justify-center gap-2 rounded-md p-2 px-5 md:w-max";

const linkButtonClass = `${buttonBaseClass} bg-blue-800 text-white hover:bg-blue-950 outline-0 transition duration-300`;

export default function MALButton({ malId }: { malId: number }) {
  return (
    <Link
      className={linkButtonClass}
      href={`https://myanimelist.net/anime/${malId}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ExternalLinkIcon />
      MyAnimeList
    </Link>
  );
}
