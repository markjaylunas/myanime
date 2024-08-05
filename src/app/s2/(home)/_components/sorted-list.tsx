import { fetchAniwatchHomeData } from "@/actions/aniwatch";
import AnimeCarouselList from "@/components/anime-cards-v2/anime-carousel-list";
import GenreListContainer from "@/components/ui/GenreListContainer";
import Heading from "@/components/ui/Heading";
import { Spacer } from "@nextui-org/spacer";

export default async function SortedList() {
  const data = await fetchAniwatchHomeData();

  if (!data) throw new Error("Failed to fetch home data");

  console.log(data.latestEpisodeAnimes);
  return (
    <>
      {/* <AnimeCarouselList animeList={data.spotlightAnimes} /> */}
      <Heading
        order="2xl"
        className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
      >
        Latest Episodes
      </Heading>
      <AnimeCarouselList animeList={data.latestEpisodeAnimes} />

      <Heading
        order="2xl"
        className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
      >
        Trending
      </Heading>
      <AnimeCarouselList animeList={data.trendingAnimes} />

      <Heading
        order="2xl"
        className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
      >
        Top Airing
      </Heading>
      <AnimeCarouselList animeList={data.topAiringAnimes} />

      <Heading
        order="2xl"
        className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
      >
        Top Upcoming
      </Heading>
      <AnimeCarouselList animeList={data.topUpcomingAnimes} />

      <Heading
        order="2xl"
        className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
      >
        Top 10
      </Heading>
      <AnimeCarouselList animeList={data.top10Animes.month} />

      <Heading
        order="2xl"
        className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
      >
        Popular
      </Heading>
      <AnimeCarouselList animeList={data.mostPopularAnimes} />

      <Heading
        order="2xl"
        className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
      >
        Most Favorite
      </Heading>
      <AnimeCarouselList animeList={data.mostFavoriteAnimes} />

      <Heading
        order="2xl"
        className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
      >
        Latest Completed
      </Heading>
      <AnimeCarouselList animeList={data.latestCompletedAnimes} />

      <Spacer y={8} />
      <GenreListContainer genreList={data.genres} />
    </>
  );
}
