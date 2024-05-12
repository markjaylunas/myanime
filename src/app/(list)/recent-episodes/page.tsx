import { fetchRecentEpisodeList } from "@/actions/action";
import AnimeList from "@/components/anime-cards/AnimeList";
import Heading from "@/components/ui/Heading";
import SimplePagination from "@/components/ui/SimplePagination";
import { SearchParams } from "@/lib/types";
import { Spacer } from "@nextui-org/spacer";

export default async function RecentEpisodesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;
  const data = await fetchRecentEpisodeList({ page: Number(page) || 1 });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  return (
    <>
      <Heading>Recent Episodes</Heading>

      <Spacer y={4} />

      <AnimeList animeList={data.results} />

      <Spacer y={4} />

      <SimplePagination
        prevDisabled={page <= 1}
        nextDisabled={data?.hasNextPage === false}
      />
    </>
  );
}
