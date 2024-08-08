import AnimeCarouselListSkeleton from "@/components/anime-cards/AnimeCarouselListSkeleton";
import AnimeListSkeleton from "@/components/anime-cards/AnimeListSkeleton";
import GenreListContainer from "@/components/ui/GenreListContainer";
import Heading from "@/components/ui/Heading";
import { genreList } from "@/lib/constants";
import { Spacer } from "@nextui-org/spacer";
import { ReactNode, Suspense } from "react";
import AiringScheduleListPage from "./_components/list/airing-schedule";
import PopularListPage from "./_components/list/popular";
import RecentEpisodeListPage from "./_components/list/recent-episode";
import TrendingListPage from "./_components/list/trending";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4">
      {children}

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Popular
        </Heading>
      </div>

      <Spacer y={2} />

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <PopularListPage />
      </Suspense>

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Trending
        </Heading>
      </div>
      <Spacer y={2} />

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <TrendingListPage />
      </Suspense>

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Airing Schedule
        </Heading>
      </div>
      <Spacer y={2} />

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <AiringScheduleListPage />
      </Suspense>
      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Recent Episodes
        </Heading>
      </div>
      <Spacer y={2} />

      <Suspense fallback={<AnimeListSkeleton />}>
        <RecentEpisodeListPage />
      </Suspense>
      <Spacer y={8} />

      <GenreListContainer genreList={genreList} />

      <Spacer y={8} />
    </main>
  );
}
