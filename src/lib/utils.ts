import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { TitleSchema } from "./meta-validations";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractYear(releaseDate: string): string {
  const match = releaseDate.match(/\d{4}/);
  return match ? match[0] : releaseDate;
}

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export function numberFormatter(number: number): string {
  return new Intl.NumberFormat().format(number);
}

export function stringToSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function pickTitle(title: TitleSchema): string {
  return title.userPreferred || title.english || title.native || title.romaji;
}

export function formatTimestamp(timestamp: number): string {
  const date = moment.unix(timestamp); // Convert to moment.js date
  return `Airing at ${date.format("MM-DD HH:mm")}`; // Format date
}

export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m` : ""}`;
}
export function secondsToHms(time: number): string {
  if (time < 3600) {
    return moment.utc(time * 1000).format("mm:ss");
  } else {
    return moment.utc(time * 1000).format("HH:mm:ss");
  }
}
