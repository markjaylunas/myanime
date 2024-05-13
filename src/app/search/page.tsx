import AnimeListSkeleton from "@/components/anime-cards/AnimeListSkeleton";
import { SearchParams } from "@/lib/types";
import { Spacer } from "@nextui-org/spacer";
import { Suspense } from "react";
import SearchAnimeResults from "./_components/SearchAnimeResults";
import SearchInput from "./_components/SearchInput";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const query =
    typeof searchParams?.query === "string" ? searchParams?.query : "";
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;

  return (
    <main className="container relative max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-2">
      <SearchInput />

      <Spacer y={4} />

      <Suspense fallback={<AnimeListSkeleton cardCount={10} />}>
        <SearchAnimeResults query={query} page={page || 1} />
      </Suspense>
    </main>
  );
}
