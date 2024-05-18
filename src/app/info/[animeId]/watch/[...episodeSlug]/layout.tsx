import { fetchAnimeData, fetchEpisodeData } from "@/actions/meta";
import EpisodeList from "@/components/ui/EpisodeList";
import { numberFormatter, pickTitle } from "@/lib/utils";
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function HomeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { animeId: string; episodeSlug: string[] };
}) {
  const { animeId, episodeSlug } = params;
  const [episodeId, episodeNumber] = episodeSlug;

  const [info, episodeListData] = await Promise.all([
    fetchAnimeData({ animeId }),
    fetchEpisodeData({ animeId, provider: "gogoanime" }),
  ]);

  if (!info) {
    return notFound();
  }

  const episodeList = (episodeListData || []).map((episode) => ({
    id: episode.id,
    episodeNumber: episode.number,
  }));

  const hasEpisode = info.totalEpisodes;
  const title = pickTitle(info.title);
  const episode = episodeListData?.find((episode) => episode.id === episodeId);
  return (
    <main className="container max-w-5xl mx-auto min-h-screen pb-8  p-0">
      {children}

      <h2 className="text-center mx-2 text-2xl text-wrap font-semibold mt-4 text-primary">
        {title}
      </h2>

      <h2 className="text-center mx-2 text-lg font-semibold mt-2 text-secondary">
        {`Episode ${numberFormatter(parseInt(episodeNumber))}${
          episode?.title ? ` - ${episode?.title}` : ""
        }`}
      </h2>

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
    </main>
  );
}
