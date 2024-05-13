import { fetchRecentEpisodeList } from "@/actions/action";
import AnimeCarouselList from "@/components/anime-cards/AnimeCarouselList";
import Heading from "@/components/ui/Heading";
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";

export default async function NoQueryDefaultAnime() {
  const response = await fetchRecentEpisodeList({ page: 1 });

  if (!response) {
    return <div>Something went wrong</div>;
  }
  return (
    <>
      <Chip className="my-4" variant="bordered" color="warning" size="lg">
        Type something to search
      </Chip>

      <Heading>Trending</Heading>

      <Spacer y={4} />

      <AnimeCarouselList animeList={response.results} />
    </>
  );
}
