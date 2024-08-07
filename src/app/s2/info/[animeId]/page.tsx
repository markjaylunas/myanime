import { fetchAWAnimeData, fetchAWEpisodeData } from "@/actions/aniwatch";
import AnimeCarouselList from "@/components/anime-cards-v2/anime-carousel-list";
import Heading from "@/components/ui/Heading";
import { notFound } from "next/navigation";
import AnimeCover from "./_components/anime-cover";
import AnimeInfoSection from "./_components/anime-info-section";
import EpisodeListSection from "./_components/episode-list-section";
import PosterMoreInfo from "./_components/poster-more-info";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const { animeId } = params;

  const [infoData, episodeData] = await Promise.all([
    fetchAWAnimeData({ animeId }),
    fetchAWEpisodeData({ animeId }),
  ]);

  if (!infoData) {
    notFound();
  }

  const {
    anime,
    mostPopularAnimes,
    recommendedAnimes,
    relatedAnimes,
    seasons,
  } = infoData;

  const { info, moreInfo } = anime;

  const episodeList = episodeData?.episodes || [];
  const animeSeasonList = seasons
    ? seasons.map((season) => ({
        id: season.id,
        name: season.name,
        poster: season.poster,
        isCurrent: season.isCurrent,
      }))
    : [];

  const firstEpisode = episodeList[0];
  const latestEpisode = episodeList[episodeList.length - 1];

  const watchLink = firstEpisode
    ? `/s1/info/${animeId}/watch/${firstEpisode.episodeId}/${firstEpisode.number}`
    : null;

  const latestLink = latestEpisode
    ? `/s1/info/${animeId}/watch/${latestEpisode.episodeId}/${latestEpisode.number}`
    : null;

  const hasEpisode =
    episodeData?.totalEpisodes && episodeData.episodes.length > 0;

  return (
    <main className="relative mb-12">
      <Heading className="block sm:hidden mx-8 text-center mt-5" order={"2xl"}>
        {info.name}
      </Heading>

      <h2 className="block sm:hidden text-xs mx-8 text-center mb-5 text-gray-400">
        {Array.from(new Set([moreInfo.synonyms])).join(" | ")}
      </h2>

      <AnimeCover title={info.name} image={info.poster} />

      <section className="max-w-7xl px-8 sm:mx-auto sm:-mt-32 flex justify-start items-center sm:items-start flex-col sm:flex-row gap-6 sm:gap-12 ">
        <PosterMoreInfo anime={anime} />

        <div className="flex flex-col gap-6 w-full">
          <AnimeInfoSection
            anime={anime}
            watchLink={watchLink}
            latestLink={latestLink}
          />

          <EpisodeListSection
            episodeList={episodeList}
            totalEpisodes={episodeData?.totalEpisodes || 0}
          />
        </div>
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

      {Boolean(relatedAnimes) && (
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

      {Boolean(recommendedAnimes) && (
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

      {Boolean(mostPopularAnimes) && (
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
