import { searchAnime } from "@/actions/meta";
import AnimeList from "@/components/anime-cards/AnimeList";
import Heading from "@/components/ui/Heading";
import SimplePagination from "@/components/ui/SimplePagination";
import { AnimeCardProps, SearchParams } from "@/lib/types";

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

  const animelist: AnimeCardProps[] =
    response?.results.map((anime) => ({
      id: anime.id,
      title: anime.title.userPreferred,
      image: anime.image,
      releaseDate: anime.releaseDate,
    })) || [];

  return (
    <>
      {hasData && <Heading>Search: {query}</Heading>}

      {hasData && <AnimeList animeList={animelist} />}

      {hasData && (
        <SimplePagination
          prevDisabled={page <= 1}
          nextDisabled={response?.hasNextPage === false}
        />
      )}

      {/* {!hasData && <NoQueryDefaultAnime />} */}
    </>
  );
}
