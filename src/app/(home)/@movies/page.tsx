import { fetchMovieList } from "@/actions/action";
import AnimeCarouselList from "@/components/home/AnimeCarouselList";
import { SearchParams } from "@/lib/types";

export default async function MovieListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;
  const data = await fetchMovieList({ page: Number(page) || 1 });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  return <AnimeCarouselList animeList={data.results} />;
}
