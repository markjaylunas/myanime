import { fetchAniwatchHomeData } from "@/actions/aniwatch";
import AnimeCarouselList from "@/components/anime-cards-v2/anime-carousel-list";
import Heading from "@/components/ui/Heading";

export default async function SpotlightList() {
  const data = await fetchAniwatchHomeData();
  if (!data) throw new Error("Failed to fetch home data");

  return (
    <section className="space-y-2">
      <Heading order="2xl" className="text-gray-700 dark:text-gray-300">
        Spotlight
      </Heading>
      <AnimeCarouselList animeList={data.spotlightAnimes} />
    </section>
  );
}
