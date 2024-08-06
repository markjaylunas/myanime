import { fetchAWAnimeData } from "@/actions/aniwatch";
import AnimeCharacterList from "@/components/anime-cards/AnimeCharacterList";
import AnimeList from "@/components/anime-cards/AnimeList";
import AnimeInfoSection from "@/components/ui/AnimeInfoSection";
import EpisodeList from "@/components/ui/EpisodeList";
import Heading from "@/components/ui/Heading";
import { pickTitle } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import InfoHero from "./_components/InfoHero";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const { animeId } = params;

  const [info, _] = await Promise.all([
    fetchAWAnimeData({ animeId }),
    // fetchEpisodeData({ animeId, provider: "gogoanime" }),
  ]);

  if (!info) {
    notFound();
  }

  const episodeList = [];
  // const episodeList = (episodeListData || []).map((episode) => ({
  //   id: episode.id,
  //   episodeNumber: episode.number,
  // }));

  const relationData = info.relatedAnimes || [];

  const title = pickTitle(info.title);

  const firstEpisode = episodeList[0];
  const latestEpisode = episodeList[episodeList.length - 1];

  const watchLink = firstEpisode
    ? `/s1/info/${animeId}/watch/${firstEpisode.id}/${firstEpisode.episodeNumber}`
    : null;

  const latestLink = latestEpisode
    ? `/s1/info/${animeId}/watch/${latestEpisode.id}/${latestEpisode.episodeNumber}`
    : null;

  const hasEpisode = info.totalEpisodes;

  return (
    <main className="space-y-8 mb-10">
      <InfoHero
        title={title}
        image={info.anime.info.poster}
        cover={info.anime.info.poster}
      />

      <section className="px-4">
        <ButtonGroup fullWidth>
          <Button
            as={NextLink}
            href={watchLink || ""}
            size="lg"
            color="primary"
            variant="bordered"
            className="text-xl font-semibold mt-4"
            isDisabled={watchLink === null}
          >
            First Episode
          </Button>
          <Button
            as={NextLink}
            href={latestLink || ""}
            size="lg"
            color="primary"
            className="text-xl font-semibold mt-4"
            isDisabled={latestLink === null}
          >
            Latest Episode
          </Button>
        </ButtonGroup>
      </section>

      <section className="px-4 mt-8 flex justify-center">
        {episodeList && hasEpisode ? (
          <EpisodeList episodeList={episodeList} />
        ) : (
          <Chip size="lg" variant="bordered" color="warning">
            No episodes available yet!
          </Chip>
        )}
      </section>

      <section className="px-0">
        <AnimeInfoSection info={info} />
      </section>

      <section className="px-4 space-y-4">
        <Heading>Characters</Heading>
        <AnimeCharacterList characterList={info.characters} />
      </section>

      <section className="px-4 space-y-4">
        <Heading>Related Anime</Heading>

        {animeList.length > 0 ? (
          <AnimeList animeList={animeList} />
        ) : (
          <Chip size="lg" variant="bordered" color="warning">
            No related anime yet!
          </Chip>
        )}
      </section>
    </main>
  );
}
