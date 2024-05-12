import { fetchGenreList } from "@/actions/action";
import GenreListContainer from "@/components/ui/GenreListContainer";
import Heading from "@/components/ui/Heading";
import { SearchParams } from "@/lib/types";

export default async function GenreListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const page = typeof searchParams?.page === "string" ? searchParams?.page : "";

  const data = await fetchGenreList({ page: Number(page) || 1 });

  if (!data) throw new Error("Failed to fetch (Genre List) data");

  return (
    <>
      <Heading className="mb-4">Genres</Heading>

      <GenreListContainer genreList={data} />
    </>
  );
}
