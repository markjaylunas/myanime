import { fetchAllEpisodeProgress } from "@/actions/action";
import { auth } from "@/auth";
import AnimeEpisodeCarouselList from "@/components/anime-cards/AnimeEpisodeCarouselList";
import Heading from "@/components/ui/Heading";
import MyLink from "@/components/ui/MyLink";
import { Spacer } from "@nextui-org/spacer";

export default async function Home() {
  const session = await auth();
  const user = session?.user || null;
  const userId = user?.id || null;

  if (!userId) return null;

  const episodeProgressData = await fetchAllEpisodeProgress({
    userId,
    filter: "unfinished",
  });

  if (!episodeProgressData.totalCount) return null;

  return (
    <>
      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Continue Watching
        </Heading>

        <MyLink href="/continue-watching" color="primary">
          View All
        </MyLink>
      </div>

      <Spacer y={2} />

      <AnimeEpisodeCarouselList animeList={episodeProgressData.episodes} />
    </>
  );
}
