import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractYear(releaseDate: string): string {
  const match = releaseDate.match(/\d{4}/);
  return match ? match[0] : releaseDate;
}
