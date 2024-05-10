import { fetchAnimeList } from "@/actions/action";
import AnimeList from "@/components/home/AnimeList";
import { SearchParams } from "@/lib/types";

export default async function AnimeListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page = typeof searchParams?.page === "string" ? searchParams?.page : "";

  const data = await fetchAnimeList({ page: Number(page) || 1 });

  if (!data) throw new Error("Failed to fetch (Anime List) data");

  return <AnimeList animeList={data.results} />;
}
