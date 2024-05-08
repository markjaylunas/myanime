import { BASE_API_URL } from "@/lib/config";
import { GOGOANIME_API_ROUTES } from "@/lib/constants";
import { fetchAnimeListData } from "@/lib/server-utils";
import AnimeCardList from "./AnimeCardList";

export default async function RecentEpisodes() {
  const list = await fetchAnimeListData(
    `${BASE_API_URL}${GOGOANIME_API_ROUTES.recentEpisodes}`
  );

  return <AnimeCardList animeList={list?.results || []} />;
}
