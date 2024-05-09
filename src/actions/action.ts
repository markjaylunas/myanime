"use server";

import { animeAPIQuery } from "@/lib/consumet-api";
import { animeInfoSchema, searchAnimeDataSchema } from "@/lib/validations";

export async function searchAnime({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.search({ query, page }),
      { next: { tags: ["search-anime"] } }
    );

    const data = await response.json();

    const parsed = searchAnimeDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }
    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAnimeInfo({ animeId }: { animeId: string }) {
  try {
    const response = await fetch(
      animeAPIQuery.anime.gogoanime.info({ animeId }),
      { next: { tags: [`info_${animeId}`] } }
    );

    const data = await response.json();

    const parsed = animeInfoSchema.safeParse(data);

    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    return parsed.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
