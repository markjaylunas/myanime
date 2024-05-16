import { fetchRecentEpisodesAnimeData } from "@/actions/meta";
import AnimeList from "@/components/anime-cards/AnimeList";
import { AnimeCardProps, SearchParams } from "@/lib/types";
import { pickTitle } from "@/lib/utils";

export default async function RecentEpisodeListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;

  const data = await fetchRecentEpisodesAnimeData({
    page: Number(page) || 1,
    perPage: 40,
    provider: "gogoanime",
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const animeList: AnimeCardProps[] = data.results.map((anime) => ({
    id: anime.id,
    image: anime.image,
    title: pickTitle(anime.title),
    episodeId: anime.episodeId,
    episodeNumber: anime.episodeNumber || anime.number,
    releaseDate: anime.releaseDate,
  }));

  return <AnimeList animeList={animeList} />;
}
