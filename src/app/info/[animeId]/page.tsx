import { fetchAnimeData, fetchEpisodeData } from "@/actions/meta";
import AnimeInfoSection from "@/components/ui/AnimeInfoSection";
import { Icons } from "@/components/ui/Icons";
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

  const title = pickTitle(info.title);

  const episode = episodeList[0];

  const watchLink = episode
    ? `/info/${animeId}/watch/${episode.id}/${episode.episodeNumber}`
    : null;

  return (
    <main className="space-y-4">
      <InfoHero
        title={title}
        image={info.image || info.cover || ""}
        cover={info.cover || info.image}
      />

      {watchLink && (
        <div className="px-4 md:px-8">
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
        </div>
      )}

      <section className="px-3 md:px-0 max-w-6xl mx-auto">
        <AnimeInfoSection info={info} />
      </section>
    </main>
  );
}
