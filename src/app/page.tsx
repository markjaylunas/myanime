import AnimeCardListSkeleton from "@/components/home/AnimeCardListSkeleton";
import Popular from "@/components/home/Popular";
import RecentEpisode from "@/components/home/RecentEpisode";
import Trending from "@/components/home/Trending";
import Heading from "@/components/ui/Heading";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-4">
      <section className="space-y-3 mb-8">
        <Heading order="2xl" className="text-gray-300">
          Recent Episodes
        </Heading>
        <Suspense fallback={<AnimeCardListSkeleton />}>
          <RecentEpisode />
        </Suspense>
      </section>

      <section className="space-y-3 mb-8">
        <Heading order="2xl" className="text-gray-300">
          Trending
        </Heading>
        <Suspense fallback={<AnimeCardListSkeleton />}>
          <Trending />
        </Suspense>
      </section>

      <section className="space-y-3 mb-8">
        <Heading order="2xl" className="text-gray-300">
          Popular
        </Heading>
        <Suspense fallback={<AnimeCardListSkeleton />}>
          <Popular />
        </Suspense>
      </section>
    </main>
  );
}
