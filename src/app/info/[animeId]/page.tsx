import { fetchAnimeData, fetchEpisodeData } from "@/actions/meta";
import EpisodeList from "@/components/ui/EpisodeList";
import { SearchParams } from "@/lib/types";
import { pickTitle } from "@/lib/utils";
import { Spacer } from "@nextui-org/spacer";
import { notFound } from "next/navigation";
import InfoAbout from "./_components/InfoAbout";
import InfoHero from "./_components/InfoHero";

export default async function InfoPage({
  params,
  searchParams,
}: {
  params: { animeId: string };

  searchParams?: SearchParams;
}) {
  const recent =
    typeof searchParams?.recent === "string"
      ? Boolean(searchParams?.recent) || true
      : true;
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

  let episode = episodeList[0];
  if (recent) {
    episode = episodeList[episodeList.length - 1];
  }
  const watchLink = episode
    ? `/info/${animeId}/watch/${episode.id}/${episode.episodeNumber}`
    : null;
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
          watchLink={watchLink}
        />
      </section>

      <Spacer y={4} />

      <EpisodeList episodeList={episodeList || []} />
    </main>
  );
}
