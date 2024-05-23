import { fetchCharacterData } from "@/actions/meta";

export default async function CharacterPage({
  params,
}: {
  params: { characterId: string };
}) {
  const { characterId } = params;

  const character = await fetchCharacterData({ characterId });
  console.log(character);

  return <main>Character Page</main>;
}
