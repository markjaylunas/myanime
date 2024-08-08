import { fetchAniwatchHomeData } from "@/actions/aniwatch";
import AnimeSpotlightCarouselList from "@/components/anime-cards-v2/anime-spotlight-carousel-list";

export default async function SpotlightList() {
  const data = await fetchAniwatchHomeData();
  if (!data) throw new Error("Failed to fetch home data");

  return (
    <section className="space-y-2 max-w-5xl mx-auto px-0 sm:px-4">
      <AnimeSpotlightCarouselList animeList={data.spotlightAnimes} />
    </section>
  );
}
