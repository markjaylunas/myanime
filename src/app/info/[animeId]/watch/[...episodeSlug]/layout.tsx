import { fetchWatchStatus } from "@/actions/action";
import { fetchAnimeData, fetchEpisodeData } from "@/actions/meta";
import { auth } from "@/auth";
import AnimeList from "@/components/anime-cards/AnimeList";
import EpisodeList from "@/components/ui/EpisodeList";
import Heading from "@/components/ui/Heading";
import { Icons } from "@/components/ui/Icons";
import NextAiringEpisode from "@/components/ui/NextAiringEpisode";
import { AnimeSortedSchema } from "@/lib/meta-validations";
import { numberFormatter, pickTitle } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";
import NextLink from "next/link";
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

  const recommendationData = info.recommendations || [];
  const animeList: AnimeSortedSchema[] = recommendationData.map((anime) => ({
    id: `${anime.id}`,
    title: anime.title,
    image: anime.image,
    cover: anime.cover || "",
    status: anime.status,
    episodes: anime.episodes,
    rating: anime.rating,
    type: anime.type,
  }));

  const hasEpisode = info.totalEpisodes;
  const title = pickTitle(info.title);
  const episode = episodeListData?.find((episode) => episode.id === episodeId);
  return (
    <main className="container max-w-5xl mx-auto min-h-screen pb-8  p-0 space-y-4">
      {children}

      <section className="px-4 md:px-0">
        <h2 className="text-center text-2xl text-wrap font-semibold  text-primary">
          {title}
        </h2>

        <h2 className="text-center mx-2 text-lg font-semibold mt-2 text-secondary">
          {`Episode ${numberFormatter(parseInt(episodeNumber))}${
            episode?.title ? ` - ${episode?.title}` : ""
          }`}
        </h2>
      </section>

      <section className="flex flex-wrap-reverse justify-end md:justify-between  gap-4 px-4 md:px-0">
        <Button
          as={NextLink}
          href={`/info/${info.id}`}
          startContent={<Icons.information />}
          className="w-full md:w-auto"
        >
          More Info
        </Button>

        <div className="flex gap-4 flex-wrap">
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
        </div>
      </section>

      <section className="px-4 md:px-0 mt-8 ">
        {info.nextAiringEpisode && (
          <NextAiringEpisode
            airingTime={info.nextAiringEpisode.airingTime}
            episode={info.nextAiringEpisode.episode}
          />
        )}
      </section>

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

      <section className="px-4 md:px-0 mt-8 space-y-4">
        <Heading>Recommended For You</Heading>

        {episodeList && hasEpisode ? (
          <AnimeList animeList={animeList} />
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
