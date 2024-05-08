import AnimeCardListSkeleton from "@/components/home/AnimeCardListSkeleton";
import Popular from "@/components/home/Popular";
import Trending from "@/components/home/Trending";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-4">
      <h1>Player</h1>
      <ThemeSwitcher />

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
