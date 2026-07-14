import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AnimeDetail } from "./schema";

dayjs.extend(customParseFormat);

function titleCase(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatMediaType(value?: string) {
  if (!value) return null;
  if (value === "tv") return "TV";
  return titleCase(value); // ova → Ova, movie → Movie
}

export function formatStatus(value?: string) {
  if (!value) return null;
  return titleCase(value); // finished_airing → Finished Airing
}

export function formatSource(value?: string) {
  if (!value) return null;
  return titleCase(value); // novel → Novel
}

export function formatMalDate(date: string) {
  const parsed = dayjs(date, "YYYY-MM-DD", true);
  if (!parsed.isValid()) return date;
  return parsed.format("MMM D, YYYY"); // Oct 6, 2016
}
export function formatAired(start?: string, end?: string) {
  if (!start) return null;
  const startLabel = formatMalDate(start);
  if (!end || end === start) return startLabel;
  return `${startLabel} to ${formatMalDate(end)}`;
}

export function getLatestVideo(videos?: AnimeDetail["videos"]) {
  if (!videos?.length) return null;
  return [...videos].sort((a, b) => b.created_at - a.created_at)[0];
}

export function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function getNumEpisodes(numEpisodes?: AnimeDetail["num_episodes"]) {
  if (!numEpisodes) return "Unknown";
  return numEpisodes.toString();
}
