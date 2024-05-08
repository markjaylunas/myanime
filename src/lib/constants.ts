export const ANIME_API_ROUTES = {
  /**
   * @constant
   * @type {string}
   * @description The `query` route. `:query` is a placeholder for the query string.
   */
  query: "/",

  /**
   * @constant
   * @type {string}
   * @description The `advancedSearch` route. The following query parameters are supported:
   * - `query`: The search query string.
   * - `page`: The page number for pagination.
   * - `perPage`: The number of items per page for pagination.
   * - `type`: The type of anime.
   * - `genres`: The genres of anime.
   * - `id`: The ID of the anime.
   * - `format`: The format of the anime.
   * - `sort`: The sort order for the results.
   * - `status`: The status of the anime.
   * - `year`: The year the anime was released.
   * - `season`: The season the anime was released in.
   */
  advancedSearch: "/advanced-search",

  /**
   * @constant
   * @type {string}
   * @description The `trending` route. The following query parameters are supported:
   * - `page`: The page number for pagination.
   * - `perPage`: The number of items per page for pagination.
   */
  trending: "/trending",

  /**
   * @constant
   * @type {string}
   * @description The `popular` route. The following query parameters are supported:
   * - `page`: The page number for pagination.
   * - `perPage`: The number of items per page for pagination.
   */
  popular: "/popular",

  /**
   * @constant
   * @type {string}
   * @description The `airing-schedule` route. The following query parameters are supported:
   * - `page`: The page number for pagination.
   * - `perPage`: The number of items per page for pagination.
   * - `weekStart`: The start of the week for the airing schedule.
   * - `weekEnd`: The end of the week for the airing schedule.
   * - `notYetAired`: A boolean indicating whether to include anime that have not yet aired.
   */
  airingSchedule: "/airing-schedule",

  /**
   * @constant
   * @type {string}
   * @description The `genre` route. The following query parameters are supported:
   * - `genres`: The genres of anime.
   * - `page`: The page number for pagination.
   * - `perPage`: The number of items per page for pagination.
   */
  genre: "/genre",

  /**
   * @constant
   * @type {string}
   * @description The `recent-episodes` route. The following query parameters are supported:
   * - `provider`: The provider of the anime episodes. Can be 'gogoanime' or 'zoro'.
   * - `page`: The page number for pagination.
   * - `perPage`: The number of items per page for pagination.
   */
  recentEpisodes: "/recent-episodes",

  /**
   * @constant
   * @type {string}
   * @description The `random-anime` route. No query parameters are supported.
   */
  randomAnime: "/random-anime",

  /**
   * @constant
   * @type {string}
   * @description The `servers` route. `:id` is a placeholder for the ID of the anime.
   * The following query parameters are supported:
   * - `provider`: The provider of the anime episodes.
   */
  servers: "/servers/:id",

  /**
   * @constant
   * @type {string}
   * @description The `episodes` route. `:id` is a placeholder for the ID of the anime.
   * The following query parameters are supported:
   * - `provider`: The provider of the anime episodes.
   * - `fetchFiller`: Whether to fetch filler episodes.
   * - `dub`: Whether to fetch dubbed episodes.
   * - `locale`: The locale for the anime.
   */
  episodes: "/episodes/:id",

  /**
   * @constant
   * @type {string}
   * @description The `data` route. `:id` is a placeholder for the ID of the anime.
   */
  data: "/data/:id",

  /**
   * @constant
   * @type {string}
   * @description The `info` route. `:id` is a placeholder for the ID of the anime.
   * The following query parameters are supported:
   * - `provider`: The provider of the anime episodes.
   * - `fetchFiller`: Whether to fetch filler episodes.
   * - `dub`: Whether to fetch dubbed episodes.
   * - `locale`: The locale for the anime.
   */
  info: "/info/:id",

  /**
   * @constant
   * @type {string}
   * @description The `character` route. `:id` is a placeholder for the ID of the character.
   */
  character: "/character/:id",

  /**
   * @constant
   * @type {string}
   * @description The `watch` route. `:episodeId` is a placeholder for the ID of the episode.
   * The following query parameters are supported:
   * - `provider`: The provider of the anime episodes.
   * - `server`: The server from which to stream the episode.
   */
  watch: "/watch/:episodeId",
};
