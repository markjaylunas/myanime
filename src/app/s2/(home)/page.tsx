import AnimeCarouselListSkeleton from "@/components/anime-cards/AnimeCarouselListSkeleton";
import { Suspense } from "react";
import ContinueList from "./_components/continue-list";
import SortedList from "./_components/sorted-list";
import SpotlightList from "./_components/spotlight-list";

export default async function Home() {
  return (
    <main className="space-y-8">
      <Suspense fallback={<AnimeCarouselListSkeleton />}>
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
