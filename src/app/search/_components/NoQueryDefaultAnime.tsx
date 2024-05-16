import { fetchRecentEpisodesAnimeData } from "@/actions/meta";
import AnimeCarouselList from "@/components/anime-cards/AnimeCarouselList";
import Heading from "@/components/ui/Heading";
import { Chip } from "@nextui-org/chip";

export default async function NoQueryDefaultAnime() {
  const data = await fetchRecentEpisodesAnimeData({
    page: 1,
    perPage: 10,
    provider: "gogoanime",
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const animeList = data.results || [];

  return (
    <>
      <Chip className="my-4" variant="bordered" color="warning" size="lg">
        Type something to search
      </Chip>

      <Heading>Trending</Heading>

      <AnimeCarouselList animeList={animeList} />
    </>
  );
}
