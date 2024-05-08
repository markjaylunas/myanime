import { BASE_API_URL } from "@/lib/config";
import { ANIME_API_ROUTES } from "@/lib/constants";
import { fetchAnimeListData } from "@/lib/server-utils";
import AnimeCardList from "./AnimeCardList";

export default async function Trending() {
  const list = await fetchAnimeListData(
    `${BASE_API_URL}${ANIME_API_ROUTES.trending}?page=1&perPage=10`
  );

  return <AnimeCardList animeList={list?.results || []} />;
}
