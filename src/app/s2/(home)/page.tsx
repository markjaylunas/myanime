import AnimeCarouselListSkeleton from "@/components/anime-cards/AnimeCarouselListSkeleton";
import { Skeleton } from "@nextui-org/skeleton";
import { Suspense } from "react";
import ContinueList from "./_components/continue-list";
import SortedList from "./_components/sorted-list";
import SpotlightList from "./_components/spotlight-list";

export default async function Home() {
  return (
    <main className="space-y-8">
      <Suspense
        fallback={
          <section className="max-w-5xl mx-auto px-0 sm:px-4 h-full w-full aspect-square sm:aspect-3/1">
            <Skeleton className="h-full w-full" />
          </section>
        }
      >
        <SpotlightList />
      </Suspense>
      <section className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4 space-y-8">
        <Suspense fallback={<AnimeCarouselListSkeleton />}>
          <ContinueList />
        </Suspense>

        <Suspense fallback={<AnimeCarouselListSkeleton />}>
          <SortedList />
        </Suspense>
      </section>
    </main>
  );
}
