import { searchAnime } from "@/actions/action";
import AnimeList from "@/components/home/AnimeList";

type Props = {
  query: string;
  page: number;
};

export default async function SearchAnimeResults({ query, page }: Props) {
  const response = await searchAnime({ query, page });

  if (!response) {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      {query}
      <AnimeList list={response.results} />
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
