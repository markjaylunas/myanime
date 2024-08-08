import { fetchAllEpisodeProgress } from "@/actions/action";
import { auth } from "@/auth";
import AnimeEpisodeCarouselList from "@/components/anime-cards/AnimeEpisodeCarouselList";
import Heading from "@/components/ui/Heading";
import ServerButton from "@/components/ui/ServerButton";
import { Spacer } from "@nextui-org/spacer";

export default async function Home() {
  const session = await auth();
  const user = session?.user || null;
  const userId = user?.id || null;

  if (!userId) return null;

  const episodeProgressData = await fetchAllEpisodeProgress({
    userId,
  });

  if (!episodeProgressData.totalCount) return null;

  return (
    <>
      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Continue Watching
        </Heading>

        <ServerButton />
        {/* 
        <MyLink href="/s2/continue-watching" color="primary">
          Show All
        </MyLink> */}
      </div>

      <Spacer y={2} />

      <AnimeEpisodeCarouselList animeList={episodeProgressData.episodes} />
    </>
  );
}
