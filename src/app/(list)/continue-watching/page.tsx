import { fetchAllEpisodeProgress } from "@/actions/action";
import { auth } from "@/auth";
import AnimeEpisodeList from "@/components/anime-cards/AnimeEpisodeList ";
import SimplePagination from "@/components/ui/SimplePagination";
import { DEFAULT_PAGE_LIMIT } from "@/lib/constants";
import { SearchParams } from "@/lib/types";
import { Spacer } from "@nextui-org/spacer";

export default async function ContinueWatchingPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;

  const session = await auth();
  const user = session?.user || null;
  const userId = user?.id || null;

  if (!userId) return null;

  const episodeProgressData = await fetchAllEpisodeProgress({
    userId,
    page: Number(page) || 1,
    limit: DEFAULT_PAGE_LIMIT,
  });

  const canNext = episodeProgressData.totalCount > page * DEFAULT_PAGE_LIMIT;

  return (
    <>
      <section className="flex-1">
        <AnimeEpisodeList animeList={episodeProgressData.episodes} />
      </section>

      <Spacer y={4} />

      <SimplePagination prevDisabled={page <= 1} nextDisabled={!canNext} />
    </>
  );
}
