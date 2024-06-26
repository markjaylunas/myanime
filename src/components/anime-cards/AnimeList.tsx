import { AnimeSortedSchema } from "@/lib/meta-validations";
import AnimeCard from "./AnimeCard";
import AnimeCardMotion from "./AnimeCardMotion";

type AnimeListProps = {
  animeList: AnimeSortedSchema[];
  isRanked?: boolean;
};

export default function AnimeList({
  animeList,
  isRanked = false,
}: AnimeListProps) {
  return (
    <ul className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {animeList.map((anime, index) => (
        <AnimeCardMotion isStaggered index={index} key={`${anime.id}-${index}`}>
          <AnimeCard {...anime} rank={isRanked ? index + 1 : undefined} />
        </AnimeCardMotion>
      ))}
    </ul>
  );
}
