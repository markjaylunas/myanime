import { API_BASE_URL } from "@/lib/config";
import { API_ANIME_ROUTES } from "@/lib/constants";
import { fetchAnimeInfoData } from "@/lib/server-utils";
import { notFound } from "next/navigation";
import InfoAbout from "./_components/InfoAbout";
import InfoHero from "./_components/InfoHero";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const info = await fetchAnimeInfoData(
    `${API_BASE_URL}${API_ANIME_ROUTES.data}/${params.animeId}`
  );

  if (!info) {
    notFound();
  }

  return (
    <main>
      <InfoHero title={info.title} image={info.image} cover={info.cover} />

      <section className="mx-8 mt-4 md:mt-8 lg:mt-12 ">
        <InfoAbout
          title={info.title}
          description={info.description}
          image={info.image}
        />
      </section>

      {/* <InfoEpisodes episodes={info.episodes} /> */}
    </main>
  );
}
