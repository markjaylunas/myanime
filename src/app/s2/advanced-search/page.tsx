import { searchAnime } from "@/actions/meta";
import AnimeList from "@/components/anime-cards/AnimeList";
import SimplePagination from "@/components/ui/SimplePagination";
import {
  ASFormatArray,
  ASGenresArray,
  ASSeasonArray,
  ASSortArray,
  ASStatusArray,
} from "@/lib/constants";
import {
  ASFormat,
  ASGenres,
  ASSeason,
  ASSort,
  ASStatus,
  SearchParams,
} from "@/lib/types";

export default async function SearchAnimeResultsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const query =
    typeof searchParams?.query === "string" ? searchParams?.query : undefined;
  const page =
    typeof searchParams?.page === "string" ? parseInt(searchParams?.page) : 1;
  const year =
    typeof searchParams?.year === "string"
      ? parseInt(searchParams?.year)
      : undefined;
  const paramSeason =
    typeof searchParams?.season === "string" ? searchParams?.season : undefined;
  const paramFormat =
    typeof searchParams?.format === "string" ? searchParams?.format : undefined;
  const paramStatus =
    typeof searchParams?.status === "string" ? searchParams?.status : undefined;
  const paramGenres =
    typeof searchParams?.genres === "string" ? searchParams?.genres : undefined;
  const paramSort =
    typeof searchParams?.sort === "string" ? searchParams?.sort : undefined;

  const genres: ASGenres[] | undefined =
    paramGenres
      ?.split(",")
      .every((item) => ASGenresArray.includes(item as ASGenres)) &&
    paramGenres !== undefined
      ? (paramGenres.split(",") as ASGenres[])
      : undefined;

  const sort: ASSort[] | undefined =
    paramSort
      ?.split(",")
      .every((item) => ASSortArray.includes(item as ASSort)) &&
    paramSort !== undefined
      ? (paramSort.split(",") as ASSort[])
      : undefined;

  const season: ASSeason | undefined = ASSeasonArray.includes(
    paramSeason as ASSeason
  )
    ? (paramSeason as ASSeason)
    : undefined;

  const format: ASFormat | undefined = ASFormatArray.includes(
    paramFormat as ASFormat
  )
    ? (paramFormat as ASFormat)
    : undefined;

  const status: ASStatus | undefined = ASStatusArray.includes(
    paramStatus as ASStatus
  )
    ? (paramStatus as ASStatus)
    : undefined;

  const data = await searchAnime({
    query,
    page,
    year,
    season,
    format,
    status,
    genres,
    sort,
  });

  const animeList = data?.results || [];
  const hasAnime = animeList.length > 0;

  return (
    <>
      {hasAnime && <AnimeList animeList={animeList} />}

      {hasAnime && (
        <SimplePagination
          prevDisabled={page <= 1}
          nextDisabled={data?.hasNextPage === false}
        />
      )}
    </>
  );
}
