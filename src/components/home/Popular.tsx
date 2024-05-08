import { API_BASE_URL } from "@/lib/config";
import { ANIME_API_ROUTES } from "@/lib/constants";
import { fetchAnimeListData } from "@/lib/server-utils";
import AnimeCardList from "./AnimeCardList";

export default async function Popular() {
  const list = await fetchAnimeListData(
    `${API_BASE_URL}${ANIME_API_ROUTES.popular}?page=1&perPage=10`
  );

  return <AnimeCardList animeList={list?.results || []} />;
}
