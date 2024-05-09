import { SearchParams } from "@/lib/types";
import { Spinner } from "@nextui-org/spinner";
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
  const page = typeof searchParams?.page === "string" ? searchParams?.page : "";

  return (
    <main>
      <div className="p-4">
        <SearchInput />

        <Suspense fallback={<Spinner />}>
          <SearchAnimeResults query={query} page={parseInt(page) || 1} />
        </Suspense>
      </div>
    </main>
  );
}
