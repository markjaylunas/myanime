import AnimeCarouselListSkeleton from "@/components/anime-cards/AnimeCarouselListSkeleton";
import { ReactNode, Suspense } from "react";
import SortedList from "./_components/sorted-list";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4">
      {children}

      <Suspense fallback={<AnimeCarouselListSkeleton />}>
        <SortedList />
      </Suspense>
    </main>
  );
}
