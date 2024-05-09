import AnimeCardListSkeleton from "@/components/home/AnimeCardListSkeleton";
import Popular from "@/components/home/Popular";
import RecentEpisode from "@/components/home/RecentEpisode";
import Trending from "@/components/home/Trending";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-4">
      <section className="space-y-3 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold ">Recent Episodes</h2>
        <Suspense fallback={<AnimeCardListSkeleton />}>
          <RecentEpisode />
        </Suspense>
      </section>

      <section className="space-y-3 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold ">Trending</h2>
        <Suspense fallback={<AnimeCardListSkeleton />}>
          <Trending />
        </Suspense>
      </section>

      <section className="space-y-3 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold ">Popular</h2>
        <Suspense fallback={<AnimeCardListSkeleton />}>
          <Popular />
        </Suspense>
      </section>
    </main>
  );
}
