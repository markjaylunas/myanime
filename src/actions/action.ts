"use server";

import { animeAPIQuery } from "@/lib/consumet-api";

export async function searchAnime({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const response = await fetch(
    animeAPIQuery.anime.gogoanime.search({ query, page }),
    { next: { tags: ["search-anime"] } }
  );

  return response.json();
}
