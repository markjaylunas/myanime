import { API_BASE_URL } from "@/lib/config";
import { API_ANIME_ROUTES } from "@/lib/constants";
import { fetchAnimeListData } from "@/lib/server-utils";
import AnimeCardList from "./AnimeCardList";

export default async function Trending() {
  const list = await fetchAnimeListData(
    `${API_BASE_URL}${API_ANIME_ROUTES.trending}?page=1&perPage=10`
  );

  return <AnimeCardList animeList={list?.results || []} />;
}
