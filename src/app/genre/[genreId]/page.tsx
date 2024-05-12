import { fetchGenreAnimeList, fetchGenreList } from "@/actions/action";
import AnimeList from "@/components/anime-cards/AnimeList";
import GenreListContainer from "@/components/ui/GenreListContainer";
import { AnimeInfoList, SearchParams } from "@/lib/types";
import { Chip } from "@nextui-org/chip";

export default async function GenreListPage({
  params,
  searchParams,
}: {
  params: { genreId: string };
  searchParams: SearchParams;
}) {
  const genreId = params.genreId;
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;

  const [genreList, genreAnimeList] = await Promise.all([
    fetchGenreList({ page: 1 }),
    fetchGenreAnimeList({ genreId, page }),
  ]);

  if (!genreList) throw new Error("Failed to fetch (Genre List) data");

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
      {genreAnime.length > 0 ? (
        <AnimeList animeList={genreAnime} />
      ) : (
        <Chip size="lg" variant="bordered" color="warning">
          No anime found
        </Chip>
      )}

      <GenreListContainer genreList={genreList} />
    </>
  );
}
