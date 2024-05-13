import { fetchAnimeInfo } from "@/actions/action";
import AnimeInfoSection from "@/components/ui/AnimeInfoSection";
import EpisodeList from "@/components/ui/EpisodeList";
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function HomeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { animeId: string; episodeSlug: string };
}) {
  const { animeId } = params;

  const info = await fetchAnimeInfo({ animeId });

  if (!info) {
    return notFound();
  }

  const episodeList = info?.episodes?.map((episode) => ({
    id: episode.id,
    episodeNumber: episode.number,
  }));

  const hasEpisode = info.totalEpisodes;

  return (
    <main className="container max-w-5xl mx-auto min-h-screen pb-8  p-0">
      {children}

      <h1 className="text-center text-xl font-semibold mt-4 text-primary">
        {info.title}
      </h1>

      <section className="px-4 md:px-0 mt-8 flex justify-center">
        {episodeList && hasEpisode ? (
          <EpisodeList episodeList={episodeList} />
        ) : (
          <Chip size="lg" variant="bordered" color="warning">
            No episodes available yet!
          </Chip>
        )}
      </section>

      <Spacer y={12} />

      <section className="px-3 md:px-0">
        <AnimeInfoSection info={info} />
      </section>
    </main>
  );
}
