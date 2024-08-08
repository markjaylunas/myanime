import { fetchAllEpisodeProgress } from "@/actions/action";
import { auth } from "@/auth";
import AnimeEpisodeCarouselList from "@/components/anime-cards/AnimeEpisodeCarouselList";
import Heading from "@/components/ui/Heading";
import ServerButton from "@/components/ui/ServerButton";

export default async function ContinueList() {
  const session = await auth();
  const user = session?.user || null;
  const userId = user?.id || null;
  if (!userId) return;

  const episodeProgressData = await fetchAllEpisodeProgress({
    userId,
  });

  if (!episodeProgressData.totalCount) return null;

  return (
    <section className="space-y-2">
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

      <AnimeEpisodeCarouselList animeList={episodeProgressData.episodes} />
    </section>
  );
}
