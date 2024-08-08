import AnimeCarouselListSkeleton from "@/components/anime-cards/AnimeCarouselListSkeleton";
import { Suspense } from "react";
import ContinueList from "./_components/continue-list";
import SortedList from "./_components/sorted-list";
import SpotlightList from "./_components/spotlight-list";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <SpotlightList />
      </Suspense>

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <ContinueList />
      </Suspense>

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <SortedList />
      </Suspense>
    </>
  );
}
