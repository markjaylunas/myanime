import { fetchPopularAnimeData } from "@/actions/meta";
import AnimeCarouselList from "@/components/anime-cards-v2/anime-carousel-list";
import { metaAnimeObjectMapper } from "@/lib/object-mapper";
import { SearchParams } from "@/lib/types";

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

  const animeList = data.results || [];

  return (
    <AnimeCarouselList animeList={metaAnimeObjectMapper(animeList, true)} />
  );
}
