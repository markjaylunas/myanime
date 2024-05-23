import { fetchAnimeData, fetchEpisodeData } from "@/actions/meta";
import AnimeCharacterList from "@/components/anime-cards/AnimeCharacterList";
import AnimeList from "@/components/anime-cards/AnimeList";
import AnimeInfoSection from "@/components/ui/AnimeInfoSection";
import Heading from "@/components/ui/Heading";
import { Icons } from "@/components/ui/Icons";
import NextAiringEpisode from "@/components/ui/NextAiringEpisode";
import { AnimeSortedSchema } from "@/lib/meta-validations";
import { pickTitle } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import InfoHero from "./_components/InfoHero";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const { animeId } = params;

  const [info, episodeListData] = await Promise.all([
    fetchAnimeData({ animeId }),
    fetchEpisodeData({ animeId, provider: "gogoanime" }),
  ]);

  if (!info) {
    notFound();
  }

  const episodeList = (episodeListData || []).map((episode) => ({
    id: episode.id,
    episodeNumber: episode.number,
  }));

  const relationData = info.relations || [];
  const animeList: AnimeSortedSchema[] = relationData.map((anime) => ({
    id: `${anime.id}`,
    title: anime.title,
    image: anime.image,
    cover: anime.cover || "",
    status: anime.status,
    episodes: anime.episodes,
    rating: anime.rating,
    type: anime.type,
  }));

  const title = pickTitle(info.title);

  const episode = episodeList[0];

  const watchLink = episode
    ? `/info/${animeId}/watch/${episode.id}/${episode.episodeNumber}`
    : null;

  return (
    <main className="space-y-8 mb-10">
      <InfoHero
        title={title}
        image={info.image || info.cover || ""}
        cover={info.cover || info.image}
      />

      {watchLink && (
        <section className="px-4">
          <Button
            as={NextLink}
            href={watchLink}
            endContent={<Icons.chevronRight />}
            fullWidth
            size="lg"
            color="primary"
            className="text-xl font-semibold mt-4"
          >
            Watch Now
          </Button>
        </section>
      )}

      {info.nextAiringEpisode && (
        <section className="px-4">
          <NextAiringEpisode
            airingTime={info.nextAiringEpisode.airingTime}
            episode={info.nextAiringEpisode.episode}
          />
        </section>
      )}

      <section className="px-0">
        <AnimeInfoSection info={info} />
      </section>

      <section className="px-4 space-y-4">
        <Heading>Characters</Heading>
        <AnimeCharacterList characterList={info.characters} />
      </section>

      <section className="px-4 space-y-4">
        <Heading>Related Anime</Heading>

        <AnimeList animeList={animeList} />
      </section>
    </main>
  );
}
