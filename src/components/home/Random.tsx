import { API_BASE_URL } from "@/lib/config";
import { API_ANIME_ROUTES } from "@/lib/constants";
import { searchAnimeListData } from "@/lib/server-utils";
import AnimeList from "./AnimeList";

export default async function Random() {
  // note: this is a temporary solution to get a random list of anime
  const list = await searchAnimeListData(
    `${API_BASE_URL}${API_ANIME_ROUTES.advancedSearch}`
  );

  if (!list) {
    return null;
  }

  // Randomize the list temporarily
  // Todo: Implement a randomization feature in the API itself
  const shuffledList = list.results.sort(() => Math.random() - 0.5);

  return <AnimeList animeList={shuffledList || []} />;
}
