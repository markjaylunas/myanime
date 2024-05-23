import { fetchCharacterData } from "@/actions/meta";
import AnimeList from "@/components/anime-cards/AnimeList";
import Heading from "@/components/ui/Heading";
import { AnimeSortedSchema } from "@/lib/meta-validations";
import { notFound } from "next/navigation";
import CharacterInfo from "./_components/character-info";

export default async function CharacterPage({
  params,
}: {
  params: { characterId: string };
}) {
  const { characterId } = params;

  const character = await fetchCharacterData({ characterId });

  if (!character) notFound();

  const relatedAnimeList: AnimeSortedSchema[] = character.relations.map(
    (anime) => ({
      id: `${anime.id}`,
      title: anime.title,
      image: anime.image,
      rating: anime.rating,
      type: anime.type,
      episodes: anime.episodes,
      status: anime.status,
      malId: anime.malId,
    })
  );

  return (
    <main className="container max-w-5xl mx-auto min-h-screen p-4 space-y-8">
      <CharacterInfo character={character} />

      <section className="space-y-4">
        <Heading>Related Anime</Heading>

        <AnimeList animeList={relatedAnimeList} />
      </section>
    </main>
  );
}
