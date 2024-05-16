import { fetchPopularAnimeData } from "@/actions/meta";
import AnimeCarouselList from "@/components/anime-cards/AnimeCarouselList";
import { AnimeCardProps, SearchParams } from "@/lib/types";
import { pickTitle } from "@/lib/utils";

export default async function PopularListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;

  const data = await fetchPopularAnimeData({ page: Number(page) || 1 });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const animeList: AnimeCardProps[] = data.results.map((anime) => ({
    id: anime.id,
    image: anime.image,
    title: pickTitle(anime.title),
    episodeId: anime.episodeId,
    episodeNumber: anime.episodeNumber || anime.number,
    releaseDate: anime.releaseDate,
  }));

  return <AnimeCarouselList animeList={animeList} />;
}
