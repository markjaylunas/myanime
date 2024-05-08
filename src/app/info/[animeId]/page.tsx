import Test from "@/components/Test";
import { API_BASE_URL } from "@/lib/config";
import { API_ANIME_ROUTES } from "@/lib/constants";
import { fetchAnimeInfoData } from "@/lib/server-utils";
import { notFound } from "next/navigation";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const info = await fetchAnimeInfoData(
    `${API_BASE_URL}${API_ANIME_ROUTES.info}/${params.animeId}`
  );

  if (!info) {
    notFound();
  }

  return (
    <div>
      Info Page
      <Test data={info} />
    </div>
  );
}
