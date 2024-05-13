import { fetchRecentEpisodeList, searchAnime } from "@/actions/action";
import AnimeList from "@/components/anime-cards/AnimeList";
import Heading from "@/components/ui/Heading";
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
  return <AnimeList animeList={response.results} />;
}

async function SearchEmptyNotice() {
  const response = await fetchRecentEpisodeList({ page: 1 });

  if (!response) {
    return <div>Something went wrong</div>;
  }
  return (
    <>
      <Heading>Trending</Heading>

      <Spacer y={4} />

      <AnimeList animeList={response.results} />
    </>
  );
}
