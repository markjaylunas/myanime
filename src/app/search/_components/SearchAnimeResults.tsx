import { searchAnime } from "@/actions/action";

type Props = {
  query: string;
  page: number;
};

export default async function SearchAnimeResults({ query, page }: Props) {
  if (query.length < 3) return <SearchEmptyNotice />;

  const response = await searchAnime({ query, page });

  if (!response) {
    return <div>Something went wrong</div>;
  }
  return <div>{/* <AnimeList list={response.results} /> */}</div>;
}

function SearchEmptyNotice() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <h1 className="text-3xl text-center text-white">Search for an anime</h1>
    </div>
  );
}
