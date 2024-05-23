import { CharacterSchema } from "@/lib/meta-validations";
import AnimeCharacterCard from "./AnimeCharacterCard";

type Props = {
  characterList: CharacterSchema[];
};

export default function AnimeCharacterList({ characterList }: Props) {
  return (
    <div className="flex flex-wrap  gap-4">
      {characterList.map((character) => (
        <AnimeCharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
