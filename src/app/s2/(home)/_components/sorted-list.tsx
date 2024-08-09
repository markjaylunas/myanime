import { fetchAniwatchHomeData } from "@/actions/aniwatch";
import AnimeCarouselList from "@/components/anime-cards-v2/anime-carousel-list";
import GenreListContainer from "@/components/ui/GenreListContainer";
import Heading from "@/components/ui/Heading";
import { Spacer } from "@nextui-org/spacer";

export default async function SortedList() {
  const data = await fetchAniwatchHomeData();
  if (!data) throw new Error("Failed to fetch home data");

  return (
    <>
      <section className="space-y-2">
        <Heading order="xl" className="text-gray-700 dark:text-gray-300 mb-2">
          Latest Episodes
        </Heading>
        <AnimeCarouselList
          animeList={data.latestEpisodeAnimes}
          isRecentEpisode
        />
      </section>

      <section className="space-y-2">
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
        >
          Trending
        </Heading>
        <AnimeCarouselList animeList={data.trendingAnimes} />
      </section>

      <section className="space-y-2">
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
        >
          Top Airing
        </Heading>
        <AnimeCarouselList animeList={data.topAiringAnimes} />
      </section>

      <section className="space-y-2">
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
        >
          Top Upcoming
        </Heading>
        <AnimeCarouselList animeList={data.topUpcomingAnimes} />
      </section>

      <section className="space-y-2">
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
        >
          Top 10
        </Heading>
        <AnimeCarouselList animeList={data.top10Animes.month} />
      </section>

      <section className="space-y-2">
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
        >
          Popular
        </Heading>
        <AnimeCarouselList animeList={data.mostPopularAnimes} />
      </section>

      <section className="space-y-2">
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
        >
          Most Favorite
        </Heading>
        <AnimeCarouselList animeList={data.mostFavoriteAnimes} />
      </section>

      <section className="space-y-2">
        <Heading
          order="xl"
          className="text-gray-700 dark:text-gray-300 mt-8 mb-2"
        >
          Latest Completed
        </Heading>
        <AnimeCarouselList animeList={data.latestCompletedAnimes} />
      </section>

      <section className="space-y-2">
        <Spacer y={8} />
        <GenreListContainer genreList={data.genres} />
      </section>
    </>
  );
}
