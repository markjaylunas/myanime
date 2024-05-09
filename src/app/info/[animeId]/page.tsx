import { API_BASE_URL } from "@/lib/config";
import { API_ANIME_ROUTES } from "@/lib/constants";
import { fetchAnimeInfoData } from "@/lib/server-utils";
import { notFound } from "next/navigation";
import InfoAbout from "./_components/InfoAbout";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const info = await fetchAnimeInfoData(
    `${API_BASE_URL}${API_ANIME_ROUTES.data}/${params.animeId}`
  );

  console.log("info");
  console.log(info);
  if (!info) {
    notFound();
  }

  return (
    <main>
      <InfoAbout info={info} />

      {/* <InfoEpisodes episodes={info.episodes} /> */}
    </main>
  );
}
