import { searchAnime } from "@/actions/action";

type Props = {
  query: string;
  page: number;
};

export default async function SearchAnimeResults({ query, page }: Props) {
  const response = await searchAnime({ query, page });
  return (
    <div>
      {query}

      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
