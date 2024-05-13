import { fetchRecentEpisodeList, searchAnime } from "@/actions/action";
import AnimeCarouselList from "@/components/anime-cards/AnimeCarouselList";
import AnimeList from "@/components/anime-cards/AnimeList";
import Heading from "@/components/ui/Heading";
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";

type Props = {
  query: string;
  page: number;
};

export default async function SearchAnimeResults({ query, page }: Props) {
  if (!query) {
    return <SearchEmptyNotice />;
  }
  const response = await searchAnime({ query, page });

  if (!response) {
    return <div>Something went wrong</div>;
  }
  return (
    <>
      <Heading className="mb-4">Search: {query}</Heading>
      {response.results.length > 0 ? (
        <AnimeList animeList={response.results} />
      ) : (
        <Chip variant="bordered" color="warning" size="lg">
          No results found
        </Chip>
      )}
    </>
  );
}

async function SearchEmptyNotice() {
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
