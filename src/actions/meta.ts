"use server";

import { animeAPIQuery } from "@/lib/consumet-api";
import { animeSearchDataSchema } from "@/lib/meta-validations";

export async function searchAnime({
  query,
  page = 1,
  signal,
}: {
  query: string;
  page?: number;
  signal?: AbortSignal;
}) {
  try {
    const response = await fetch(
      animeAPIQuery.meta.anilist.search({ query, page }),
      { signal }
    );

    const data = await response.json();

    const parsed = animeSearchDataSchema.safeParse(data);

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
