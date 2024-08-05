import AnimeListSkeleton from "@/components/anime-cards/AnimeListSkeleton";
import { Skeleton } from "@nextui-org/skeleton";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4 space-y-8">
      <Suspense
        fallback={
          <>
            <Skeleton className="h-9 mb-4" />
            <AnimeListSkeleton cardCount={10} />
          </>
        }
      >
        {children}
      </Suspense>
    </main>
  );
}
