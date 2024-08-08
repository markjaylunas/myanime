import { fetchWatchStatus } from "@/actions/action";
import {
  fetchAWAnimeData,
  fetchAWEpisodeData,
  fetchAWEpisodeServersData,
} from "@/actions/aniwatch";
import { auth } from "@/auth";
import AnimeCarouselList from "@/components/anime-cards-v2/anime-carousel-list";
import Heading from "@/components/ui/Heading";
import { Icons } from "@/components/ui/Icons";
import Text from "@/components/ui/Text";
import ServerOptionList, {
  ServerOptionListType,
} from "@/components/video-player-2/server-option-list";
import { decodeEpisodeId } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import EpisodeListSection from "../../_components/episode-list-section";
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
  const [episodeId] = episodeSlug;
  const decodedEpisodeId = decodeEpisodeId(episodeId);

  const session = await auth();
  const userId = session?.user?.id;

  const [infoData, episodeData, episodeServersData, animeWatchStatus] =
    await Promise.all([
      fetchAWAnimeData({ animeId }),
      fetchAWEpisodeData({ animeId }),
      fetchAWEpisodeServersData({ episodeId: decodedEpisodeId }),

      userId ? fetchWatchStatus({ userId, animeId }) : [],
    ]);

  if (!infoData) notFound();

  const {
    anime,
    mostPopularAnimes,
    recommendedAnimes,
    relatedAnimes,
    seasons,
  } = infoData;

  const server = "s2";
  const episodeList = episodeData?.episodes || [];
  const totalEpisodes = episodeData?.totalEpisodes || 0;

  const animeSeasonList = seasons
    ? seasons.map((season) => ({
        id: season.id,
        name: season.name,
        poster: season.poster,
        isCurrent: season.isCurrent,
      }))
    : [];

  const serverListOption: ServerOptionListType = [
    { type: "sub", list: episodeServersData?.sub || [] },
    { type: "dub", list: episodeServersData?.dub || [] },
    { type: "raw", list: episodeServersData?.raw || [] },
  ];

  const serverListFiltered = serverListOption.filter(
    (server) => server.list.length > 0
  );

  return (
    <main className=" max-w-7xl mx-auto min-h-screen pb-8  p-0 space-y-4">
      <section className="grid grid-cols-10 gap-4 w-full md:px-4 ">
        <div className="col-span-full md:col-span-7 ">
          {children}

          <div className="flex flex-col w-full gap-2 px-4 md:px-0">
            <Text className="text-xs text-foreground-500">
              If current stream server doesn&apos;t work please try other stream
              servers below.
            </Text>

            <section className="flex justify-between flex-col sm:flex-row w-full gap-4">
              {episodeServersData && (
                <ServerOptionList
                  serverList={serverListFiltered}
                  animeId={animeId}
                  episodeId={episodeId}
                  episodeNumber={episodeServersData.episodeNo}
                />
              )}

              <div className="flex justify-start md:justify-end gap-2 flex-wrap">
                <Button
                  as={NextLink}
                  href={`/${server}/info/${anime.info.id}`}
                  startContent={<Icons.information />}
                  size="sm"
                >
                  Info
                </Button>

                <ScoreDropdown
                  animeWatchStatus={
                    animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                  }
                  anime={{
                    id: animeId,
                    title: anime.info.name,
                    image: anime.info.poster,
                    cover: "",
                  }}
                />
                <WatchListDropdown
                  animeWatchStatus={
                    animeWatchStatus.length > 0 ? animeWatchStatus[0] : null
                  }
                  anime={{
                    id: animeId,
                    title: anime.info.name,
                    image: anime.info.poster,
                    cover: "",
                  }}
                />
              </div>
            </section>
          </div>
        </div>

        <div className="col-span-full md:col-span-3 px-4 md:px-0">
          <Text className="text-primary-500 font-medium">
            {anime.info.name}
          </Text>

          <EpisodeListSection
            episodeList={episodeList}
            totalEpisodes={totalEpisodes}
          />
        </div>
      </section>

      {Boolean(animeSeasonList.length) && (
        <section className="max-w-7xl px-4 sm:mx-auto">
          <Heading
            order="2xl"
            className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
          >
            Seasons
          </Heading>
          <AnimeCarouselList animeList={animeSeasonList} />
        </section>
      )}

      {Boolean(relatedAnimes?.length) && (
        <section className="max-w-7xl px-4 sm:mx-auto">
          <Heading
            order="2xl"
            className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
          >
            Related
          </Heading>
          <AnimeCarouselList animeList={relatedAnimes || []} />
        </section>
      )}

      {Boolean(recommendedAnimes?.length) && (
        <section className="max-w-7xl px-4 sm:mx-auto">
          <Heading
            order="2xl"
            className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
          >
            Recommendations
          </Heading>
          <AnimeCarouselList animeList={recommendedAnimes || []} />
        </section>
      )}

      {Boolean(mostPopularAnimes?.length) && (
        <section className="max-w-7xl px-4 sm:mx-auto">
          <Heading
            order="2xl"
            className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
          >
            Most Popular
          </Heading>
          <AnimeCarouselList animeList={mostPopularAnimes || []} />
        </section>
      )}
    </main>
  );
}
