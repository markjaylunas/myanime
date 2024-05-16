import { fetchGenreAnimeData } from "@/actions/meta";
import AnimeList from "@/components/anime-cards/AnimeList";
import GenreListContainer from "@/components/ui/GenreListContainer";
import Heading from "@/components/ui/Heading";
import SimplePagination from "@/components/ui/SimplePagination";
import { genreList } from "@/lib/constants";
import { AnimeCardProps, SearchParams } from "@/lib/types";
import { pickTitle } from "@/lib/utils";
import { Chip } from "@nextui-org/chip";
import { notFound } from "next/navigation";

export default async function GenreListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const genres =
    typeof searchParams?.genres === "string"
      ? searchParams?.genres || "[Action]"
      : "[Action]";

  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;

  const parsedGenres = genres
    .slice(1, -1)
    .split(",")
    .map((genre) => genre.trim());

  const isValidGenres = parsedGenres.every((genre) =>
    genreList.includes(genre)
  );

  if (!isValidGenres) return notFound();

  const data = await fetchGenreAnimeData({ genres: parsedGenres, page });

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
      <Heading>Genre: {parsedGenres.join(", ")}</Heading>

      <GenreListContainer genreList={genreList} />

      {animeList.length > 0 ? (
        <AnimeList animeList={animeList} />
      ) : (
        <Chip size="lg" variant="bordered" color="warning">
          No anime found
        </Chip>
      )}

      <SimplePagination
        prevDisabled={page <= 1}
        nextDisabled={data?.hasNextPage === false}
      />
    </>
  );
}
