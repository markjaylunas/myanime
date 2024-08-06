import { fetchAWAnimeData, fetchAWEpisodeData } from "@/actions/aniwatch";
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

      <section className="max-w-7xl mx-8 px-8 sm:mx-auto sm:-mt-32 flex justify-start items-center sm:items-start flex-col sm:flex-row gap-6 sm:gap-12 ">
        <PosterMoreInfo anime={anime} />

        <div className="flex flex-col gap-6">
          <AnimeInfoSection anime={anime} />

          <EpisodeListSection
            episodeList={episodeList}
            totalEpisodes={episodeData?.totalEpisodes || 0}
          />
        </div>
      </section>
    </main>
  );
}
