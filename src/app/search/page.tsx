import { searchAnime } from "@/actions/action";
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

  const response = await searchAnime({ query, page });
  const hasData = !!response;

  return (
    <>
      {hasData && <Heading>Search: {query}</Heading>}

      {hasData && <AnimeList animeList={response.results} />}

      {hasData && (
        <SimplePagination
          prevDisabled={page <= 1}
          nextDisabled={response?.hasNextPage === false}
        />
      )}

      {!hasData && <NoQueryDefaultAnime />}
    </>
  );
}
