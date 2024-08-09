import { AWAnimeSchema } from "./aniwatch-validations";
import { AnimeSortedSchema } from "./meta-validations";
import { AnimeCardType } from "./types";
import { formatTimestamp, pickTitle } from "./utils";

export const aniwatchAnimeObjectMapper = (
  animeList: AWAnimeSchema[]
): AnimeCardType[] =>
  animeList.map((anime) => ({
    id: anime.id,
    name: anime.name,
    poster: anime.poster,
    type: anime.type,
    sub: anime.episodes?.sub,
    dub: anime.episodes?.dub,
    isLatestSeason: anime.isCurrent,
    rank: anime.rank,
    duration: anime.duration,
    rated: anime.rating,
  }));

export const metaAnimeObjectMapper = (
  animeList: AnimeSortedSchema[],
  isRanked = false
): AnimeCardType[] =>
  animeList.map((anime, animeIdx) => {
    let date = null;
    if (anime.releaseDate) date = `${anime.releaseDate}`;
    if (anime.airingAt) date = formatTimestamp(anime.airingAt);

    return {
      id: anime.id,
      name: pickTitle(anime.title),
      poster: anime.image,
      type: anime.type?.split("_").join(" "),
      sub: anime.episodeNumber ? anime.episodeNumber : null,
      dub: null,
      isLatestSeason: false,
      rank: isRanked ? animeIdx + 1 : null,
      duration: anime.duration ? `${anime.duration}m` : null,
      releaseDate: date,
      rating: anime.rating ? `${anime.rating}` : null,
    };
  });
