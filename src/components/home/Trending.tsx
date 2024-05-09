import { API_BASE_URL } from "@/lib/config";
import { API_ANIME_ROUTES } from "@/lib/constants";
import { fetchAnimeListData } from "@/lib/server-utils";
import AnimeCarouselList from "./AnimeCarouselList";

export default async function Trending() {
  const list = await fetchAnimeListData(
    `${API_BASE_URL}${API_ANIME_ROUTES.trending}`
  );

  return <AnimeCarouselList animeList={list?.results || []} />;
}
