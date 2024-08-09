import { AWAnimeSchema } from "./aniwatch-validations";
import { AnimeType } from "./types";

export const aniwatchAnimeObjectMapper = (
  animeList: AWAnimeSchema[]
): AnimeType[] =>
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
    rating: null,
  }));
