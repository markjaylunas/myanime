import Test from "@/components/Test";
import { BASE_API_URL } from "@/lib/config";
import { ANIME_API_ROUTES } from "@/lib/constants";
import { fetchAnimeInfoData } from "@/lib/server-utils";
import { notFound } from "next/navigation";

export default async function InfoPage({
  params,
}: {
  params: { animeId: string };
}) {
  const info = await fetchAnimeInfoData(
    `${BASE_API_URL}${ANIME_API_ROUTES.info}/${params.animeId}`
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
