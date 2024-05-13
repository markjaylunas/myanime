import AnimeCarouselListSkeleton from "@/components/anime-cards/AnimeCarouselListSkeleton";
import AnimeListSkeleton from "@/components/anime-cards/AnimeListSkeleton";
import Heading from "@/components/ui/Heading";
import MyLink from "@/components/ui/MyLink";
import { Spacer } from "@nextui-org/spacer";
import { ReactNode, Suspense } from "react";
import MovieListPage from "./_components/list/movies";
import PopularListPage from "./_components/list/popular";
import RecentEpisodeListPage from "./_components/list/recent-episodes";
import TopAiringListPage from "./_components/list/top-airing";

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

        <MyLink href="/popular">View All</MyLink>
      </div>

      <Spacer y={2} />

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <PopularListPage />
      </Suspense>

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Top Airing
        </Heading>

        <MyLink href="/top-airing">View All</MyLink>
      </div>
      <Spacer y={2} />

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <TopAiringListPage />
      </Suspense>

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Movies
        </Heading>

        <MyLink href="/movies">View All</MyLink>
      </div>
      <Spacer y={2} />

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <MovieListPage />
      </Suspense>
      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Recent Episodes
        </Heading>

        <MyLink href="/recent-episodes">View All</MyLink>
      </div>
      <Spacer y={2} />

      <Suspense fallback={<AnimeListSkeleton />}>
        <RecentEpisodeListPage />
      </Suspense>
      <Spacer y={8} />

      <Spacer y={8} />
    </main>
  );
}
