import { animeDataSchema } from "./validations";

export async function fetchAnimeListData(url: string) {
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const data = await response.json();

  const parsed = animeDataSchema.safeParse(data);

  if (!parsed.success) {
    console.error(parsed.error);
    return;
  }

  return parsed.data;
}
