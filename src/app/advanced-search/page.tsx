import { searchAnime } from "@/actions/meta";
import AnimeList from "@/components/anime-cards/AnimeList";
import Heading from "@/components/ui/Heading";
import SimplePagination from "@/components/ui/SimplePagination";
import { SearchParams } from "@/lib/types";
import NoQueryDefaultAnime from "./_components/NoQueryDefaultAnime";

type Props = {
  query: string;
  page: number;
};

export default async function SearchAnimeResultsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const query =
    typeof searchParams?.query === "string" ? searchParams?.query : "";

  const page =
    typeof searchParams?.page === "string" ? parseInt(searchParams?.page) : 1;

  const data = await searchAnime({ query, page });

  const animeList = data?.results || [];

  return (
    <>
      {animeList && <Heading>Search: {query}</Heading>}

      {animeList && <AnimeList animeList={animeList} />}

      {animeList && (
        <SimplePagination
          prevDisabled={page <= 1}
          nextDisabled={data?.hasNextPage === false}
        />
      )}

      {!animeList && <NoQueryDefaultAnime />}
    </>
  );
}
