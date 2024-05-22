import { fetchWatchStatus } from "@/actions/action";
import { fetchAnimeData, fetchEpisodeData } from "@/actions/meta";
import { auth } from "@/auth";
import EpisodeList from "@/components/ui/EpisodeList";
import NextAiringEpisode from "@/components/ui/NextAiringEpisode";
import { numberFormatter, pickTitle } from "@/lib/utils";
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import ScoreDropdown from "./_components/score-dropdown";
import WatchListDropdown from "./_components/watchlist-dropdown";

export default async function HomeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { animeId: string; episodeSlug: string[] };
}) {
  const { animeId, episodeSlug } = params;
  const [episodeId, episodeNumber] = episodeSlug;

  const session = await auth();
  const userId = session?.user?.id;

  const [info, episodeListData, animeWatchStatus] = await Promise.all([
    fetchAnimeData({ animeId }),
    fetchEpisodeData({ animeId, provider: "gogoanime" }),
    userId ? fetchWatchStatus({ userId, animeId }) : [],
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
    <main className="container max-w-5xl mx-auto min-h-screen pb-8  p-0 space-y-4">
      {children}

      <section className="px-4">
        <h2 className="text-center text-2xl text-wrap font-semibold  text-primary">
          {title}
        </h2>

        <h2 className="text-center mx-2 text-lg font-semibold mt-2 text-secondary">
          {`Episode ${numberFormatter(parseInt(episodeNumber))}${
            episode?.title ? ` - ${episode?.title}` : ""
          }`}
        </h2>
      </section>

      <section className="flex justify-between gap-2 px-4">
        <ScoreDropdown
          animeWatchStatus={
            animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
          }
          anime={{
            id: animeId,
            title: pickTitle(info.title),
            image: info.image,
            cover: info.cover || "",
          }}
        />
        <WatchListDropdown
          animeWatchStatus={
            animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
          }
          anime={{
            id: animeId,
            title: pickTitle(info.title),
            image: info.image,
            cover: info.cover || "",
          }}
        />
      </section>

      {info.nextAiringEpisode && (
        <NextAiringEpisode
          airingTime={info.nextAiringEpisode.airingTime}
          episode={info.nextAiringEpisode.episode}
        />
      )}

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
