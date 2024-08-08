import {
  fetchAWAnimeData,
  fetchAWEpisodeData,
  fetchAWEpisodeServersData,
} from "@/actions/aniwatch";
import AnimeCarouselList from "@/components/anime-cards-v2/anime-carousel-list";
import Heading from "@/components/ui/Heading";
import ServerOptionList, {
  ServerOptionListType,
} from "@/components/video-player-2/server-option-list";
import { decodeEpisodeId } from "@/lib/utils";
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
  const { animeId, episodeSlug } = params;
  const [episodeId] = episodeSlug;
  const decodedEpisodeId = decodeEpisodeId(episodeId);

  const [infoData, episodeData, episodeServersData] = await Promise.all([
    fetchAWAnimeData({ animeId }),
    fetchAWEpisodeData({ animeId }),
    fetchAWEpisodeServersData({ episodeId: decodedEpisodeId }),
  ]);

  if (!infoData) notFound();

  const { mostPopularAnimes, recommendedAnimes, relatedAnimes, seasons } =
    infoData;

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
        <div className="col-span-full md:col-span-7">
          {children}

          {episodeServersData && (
            <ServerOptionList
              serverList={serverListFiltered}
              animeId={animeId}
              episodeId={episodeId}
              episodeNumber={episodeServersData.episodeNo}
              className="px-4 md:px-0"
            />
          )}
        </div>

        <EpisodeListSection
          episodeList={episodeList}
          totalEpisodes={totalEpisodes}
          className="col-span-full md:col-span-3 px-4 md:px-0"
        />
      </section>

      {Boolean(animeSeasonList.length) && (
        <section className="max-w-7xl px-8 sm:mx-auto">
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
        <section className="max-w-7xl px-8 sm:mx-auto">
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
        <section className="max-w-7xl px-8 sm:mx-auto">
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
        <section className="max-w-7xl px-8 sm:mx-auto">
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
