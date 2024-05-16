import { fetchAiringScheduleAnimeData } from "@/actions/meta";
import AnimeList from "@/components/anime-cards/AnimeList";
import SimplePagination from "@/components/ui/SimplePagination";
import { AnimeCardProps, SearchParams } from "@/lib/types";
import { pickTitle } from "@/lib/utils";
import { Spacer } from "@nextui-org/spacer";

export default async function AiringSchedulePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;
  const data = await fetchAiringScheduleAnimeData({
    page: Number(page) || 1,
    perPage: 20,
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const animeList: AnimeCardProps[] = data.results.map((anime) => ({
    id: anime.id,
    image: anime.image,
    title: pickTitle(anime.title),
    episodeId: anime.episodeId,
    episodeNumber: anime.episodeNumber,
    releaseDate: anime.releaseDate,
  }));

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
