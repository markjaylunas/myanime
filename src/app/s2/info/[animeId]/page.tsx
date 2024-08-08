import { fetchAWAnimeData, fetchAWEpisodeData } from "@/actions/aniwatch";
import AnimeCarouselList from "@/components/anime-cards-v2/anime-carousel-list";
import Heading from "@/components/ui/Heading";
import { SearchParams } from "@/lib/types";
import { encodeEpisodeId } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import NextLink from "next/link";
import { notFound, redirect } from "next/navigation";
import AnimeCover from "./_components/anime-cover";
import AnimeInfoSection from "./_components/anime-info-section";
import EpisodeListSection from "./_components/episode-list-section";
import PosterMoreInfo from "./_components/poster-more-info";

export default async function InfoPage({
  params,
  searchParams,
}: {
  params: { animeId: string };
  searchParams?: SearchParams;
}) {
  const { animeId } = params;
  const toWatch =
    typeof searchParams?.watch === "string"
      ? Boolean(searchParams?.watch) || false
      : false;

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
    ? `/s2/info/${animeId}/watch/${encodeEpisodeId(firstEpisode.episodeId)}/${
        firstEpisode.number
      }`
    : null;

  if (toWatch && watchLink) redirect(watchLink);

  const latestLink = latestEpisode
    ? `/s2/info/${animeId}/watch/${encodeEpisodeId(latestEpisode.episodeId)}/${
        latestEpisode.number
      }`
    : null;

  return (
    <main className="relative mb-12">
      <AnimeCover title={info.name} image={info.poster} />

      <section className="max-w-7xl px-4 sm:mx-auto -mt-32 flex justify-start items-center sm:items-start flex-col sm:flex-row gap-6 sm:gap-12 ">
        <div className="space-y-2">
          <Heading
            className="block sm:hidden mx-8 text-center mt-5"
            order={"2xl"}
          >
            {info.name}
          </Heading>

          <h3 className="block sm:hidden text-xs mx-8 text-center mb-5 text-gray-400">
            {Array.from(new Set([moreInfo.synonyms])).join(" | ")}
          </h3>
        </div>
        <PosterMoreInfo anime={anime} classname="w-full" />

        <div className="flex flex-col gap-6">
          <AnimeInfoSection anime={anime}>
            <ButtonGroup className="sm:w-fit w-full">
              <Button
                as={NextLink}
                href={watchLink || ""}
                size="lg"
                color="primary"
                className="text-xl font-semibold w-full"
                isDisabled={watchLink === null}
              >
                Watch Now
              </Button>
              <Button
                as={NextLink}
                href={latestLink || ""}
                size="lg"
                color="primary"
                variant="bordered"
                className="text-xl font-semibold w-full"
                isDisabled={latestLink === null}
              >
                Latest
              </Button>
            </ButtonGroup>
          </AnimeInfoSection>

          <EpisodeListSection
            episodeList={episodeList}
            totalEpisodes={episodeData?.totalEpisodes || 0}
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
