import AnimeCardMotion from "./AnimeCardMotion";
import AnimeEpisodeCard, { AnimeEpisodeCardProps } from "./AnimeEpisodeCard";

type AnimeListProps = {
  animeList: AnimeEpisodeCardProps[];
};

export default function AnimeEpisodeList({ animeList }: AnimeListProps) {
  return (
    <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 gap-y-6">
      {animeList.map((anime, index) => (
        <AnimeCardMotion isStaggered index={index} key={`${anime.id}-${index}`}>
          <AnimeEpisodeCard {...anime} />
        </AnimeCardMotion>
      ))}
    </ul>
  );
}
