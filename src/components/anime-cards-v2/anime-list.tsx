import { AnimeCardType } from "@/lib/types";
import AnimeCardMotion from "../anime-cards/AnimeCardMotion";
import AnimeCard from "./anime-card";

type AnimeListProps = {
  animeList: AnimeCardType[];
  isRecentEpisode?: boolean;
};

export default function AnimeList({
  animeList,
  isRecentEpisode,
}: AnimeListProps) {
  return (
    <ul className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {animeList.map((anime, index) => (
        <AnimeCardMotion isStaggered index={index} key={`${anime.id}-${index}`}>
          <AnimeCard anime={anime} isRecentEpisode={isRecentEpisode} />
        </AnimeCardMotion>
      ))}
    </ul>
  );
}
