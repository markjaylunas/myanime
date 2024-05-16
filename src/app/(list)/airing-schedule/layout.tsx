import AnimeListSkeleton from "@/components/anime-cards/AnimeListSkeleton";
import Heading from "@/components/ui/Heading";
import { Spacer } from "@nextui-org/spacer";
import { ReactNode, Suspense } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Heading>Airing Schedule</Heading>

      <Spacer y={4} />

      <Suspense fallback={<AnimeListSkeleton cardCount={10} />}>
        {children}
      </Suspense>
    </>
  );
}
