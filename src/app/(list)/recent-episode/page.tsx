import { fetchRecentEpisodesAnimeData } from "@/actions/meta";
import AnimeList from "@/components/anime-cards/AnimeList";
import SimplePagination from "@/components/ui/SimplePagination";
import { SearchParams } from "@/lib/types";
import { Spacer } from "@nextui-org/spacer";

export default async function RecentEpisodePage({
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
    perPage: 20,
    provider: "gogoanime",
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const animeList = data.results || [];

  return (
    <>
      <AnimeList animeList={animeList} />

      <Spacer y={4} />

      <SimplePagination
        prevDisabled={page <= 1}
        nextDisabled={data?.hasNextPage === false}
      />
    </>
  );
}
