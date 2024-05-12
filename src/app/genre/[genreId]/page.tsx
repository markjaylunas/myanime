import { fetchGenreAnimeList, fetchGenreList } from "@/actions/action";
import AnimeList from "@/components/home/AnimeList";
import GenreListContainer from "@/components/ui/GenreListContainer";
import Heading from "@/components/ui/Heading";
import SimplePagination from "@/components/ui/SimplePagination";
import { AnimeInfoList, SearchParams } from "@/lib/types";
import { toTitleCase } from "@/lib/utils";

export default async function GenreListPage({
  params,
  searchParams,
}: {
  params: { genreId: string };
  searchParams: SearchParams;
}) {
  const genreId = params.genreId;
  const page = typeof searchParams?.page === "string" ? searchParams?.page : "";

  const [genreList, genreAnimeList] = await Promise.all([
    fetchGenreList({ page: 1 }),
    fetchGenreAnimeList({ genreId, page: Number(page) || 1 }),
  ]);

  if (!genreList) throw new Error("Failed to fetch (Genre List) data");
  console.log(genreAnimeList?.hasNextPage);

  const genreAnime: AnimeInfoList["results"] =
    genreAnimeList?.results.map((anime) => ({
      id: anime.id,
      title: anime.title,
      image: anime.image,
      url: anime.url,
      releaseDate: anime.released,
    })) || [];

  return (
    <>
      <Heading>Genre: {toTitleCase(genreId.split("-").join(" "))}</Heading>

      {genreAnime.length > 0 && <AnimeList animeList={genreAnime} />}

      <SimplePagination
        nextDisabled={genreAnimeList?.hasNextPage === false}
        prevDisabled={parseInt(page) <= 1}
      />

      <GenreListContainer genreList={genreList} />
    </>
  );
}
