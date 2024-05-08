import RecentEpisodes from "@/components/home/RecentEpisodes";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Spinner } from "@nextui-org/spinner";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="container max-w-5xl mx-auto border-1 min-h-screen px-4">
      <h1>Player</h1>
      <ThemeSwitcher />

      <section>
        <h2>Recent Episodes</h2>
        <Suspense fallback={<Spinner />}>
          <RecentEpisodes />
        </Suspense>
      </section>
    </main>
  );
}
