import { fetchAnimeData, fetchEpisodeData } from "@/actions/meta";
import EpisodeList from "@/components/ui/EpisodeList";
import { pickTitle } from "@/lib/utils";
import { Spacer } from "@nextui-org/spacer";
import { notFound } from "next/navigation";
import InfoAbout from "./_components/InfoAbout";
import InfoHero from "./_components/InfoHero";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const { animeId } = params;

  const [info, episodeListData] = await Promise.all([
    fetchAnimeData({ animeId }),
    fetchEpisodeData({ animeId }),
  ]);

  if (!info) {
    notFound();
  }

  const episodeList = (episodeListData || []).map((episode) => ({
    id: episode.id,
    episodeNumber: episode.number,
  }));

  const title = pickTitle(info.title);
  return (
    <main>
      {/* add cover */}
      <InfoHero
        title={title}
        image={info.image}
        cover={info.cover || info.image}
      />

      <section className="mx-8 mt-4 md:mt-8 lg:mt-12 ">
        <InfoAbout
          title={title}
          description={info.description}
          image={info.image}
        />
      </section>

      <Spacer y={4} />

      <EpisodeList episodeList={episodeList || []} />
    </main>
  );
}
