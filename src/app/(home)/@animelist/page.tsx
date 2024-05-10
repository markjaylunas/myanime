import { fetchAnimeList } from "@/actions/action";
import AnimeList from "@/components/home/AnimeList";
import { SearchParams } from "@/lib/types";

export default async function AnimeListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page =
    typeof searchParams?.page === "string" ? parseInt(searchParams?.page) : 1;

  const data = await fetchAnimeList({ page });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  return <AnimeList animeList={data.results} />;
}
