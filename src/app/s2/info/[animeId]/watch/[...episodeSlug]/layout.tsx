import { fetchAWAnimeData, fetchAWEpisodeData } from "@/actions/aniwatch";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import EpisodeListSection from "../../_components/episode-list-section";

export default async function HomeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { animeId: string; episodeSlug: string[] };
}) {
  const { animeId } = params;
  const [infoData, episodeData] = await Promise.all([
    fetchAWAnimeData({ animeId }),
    fetchAWEpisodeData({ animeId }),
  ]);

  if (!infoData) notFound();

  const { anime } = infoData;

  const episodeList = episodeData?.episodes || [];
  const totalEpisodes = episodeData?.totalEpisodes || 0;

  return (
    <main className=" max-w-7xl mx-auto min-h-screen pb-8  p-0 space-y-4">
      <section className="grid grid-cols-10 grid-rows-3 gap-4 w-full md:px-4 ">
        <div className="col-span-full md:col-span-7">{children}</div>

        <EpisodeListSection
          episodeList={episodeList}
          totalEpisodes={totalEpisodes}
          className="col-span-full md:col-span-3 px-4 md:px-0"
        />
      </section>
    </main>
  );
}
