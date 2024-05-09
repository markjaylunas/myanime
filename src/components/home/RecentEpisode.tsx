import { API_BASE_URL } from "@/lib/config";
import { API_ANIME_ROUTES } from "@/lib/constants";
import { fetchRecentAnimeEpisodeListData } from "@/lib/server-utils";
import AnimeCardList from "./AnimeCardList";

export default async function RecentEpisode() {
  const list = await fetchRecentAnimeEpisodeListData(
    `${API_BASE_URL}${API_ANIME_ROUTES.recentEpisodes}`
  );

  return <AnimeCardList animeList={list?.results || []} />;
}
