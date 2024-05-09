import { fetchAnimeInfo } from "@/actions/action";
import Episodes from "@/components/ui/Episodes";
import { notFound } from "next/navigation";
import InfoAbout from "./_components/InfoAbout";
import InfoHero from "./_components/InfoHero";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const { animeId } = params;

  // merge meta/anilist data with anime data
  const info = await fetchAnimeInfo({ animeId });

  if (!info) {
    notFound();
  }

  const episodeList = info.episodes.map((episode) => ({
    id: episode.id,
    episodeNumber: episode.number,
  }));

  return (
    <main>
      {/* add cover */}
      <InfoHero title={info.title} image={info.image} cover={""} />

      <section className="mx-8 mt-4 md:mt-8 lg:mt-12 ">
        <InfoAbout
          title={info.title}
          description={info.description}
          image={info.image}
        />
      </section>

      <Episodes animeId={animeId} episodeList={episodeList} />
    </main>
  );
}
