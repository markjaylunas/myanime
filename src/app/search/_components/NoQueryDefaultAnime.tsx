import { fetchRecentEpisodesAnimeData } from "@/actions/meta";
import AnimeCarouselList from "@/components/anime-cards/AnimeCarouselList";
import Heading from "@/components/ui/Heading";
import { AnimeCardProps } from "@/lib/types";
import { pickTitle } from "@/lib/utils";
import { Chip } from "@nextui-org/chip";

export default async function NoQueryDefaultAnime() {
  const data = await fetchRecentEpisodesAnimeData({
    page: 1,
    perPage: 10,
    provider: "gogoanime",
  });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  const animeList: AnimeCardProps[] = data.results.map((anime) => ({
    id: anime.id,
    image: anime.image,
    title: pickTitle(anime.title),
    episodeId: anime.episodeId,
    episodeNumber: anime.episodeNumber || anime.number,
    releaseDate: anime.releaseDate,
  }));

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
