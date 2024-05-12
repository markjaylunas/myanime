import AnimeListSkeleton from "@/components/anime-cards/AnimeListSkeleton";
import Heading from "@/components/ui/Heading";
import { toTitleCase } from "@/lib/utils";
import { ReactNode, Suspense } from "react";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { genreId: string };
}) {
  const genreId = params.genreId;
  return (
    <>
      <Heading>Genre: {toTitleCase(genreId.split("-").join(" "))}</Heading>

      <Suspense fallback={<AnimeListSkeleton cardCount={10} />}>
        {children}
      </Suspense>
    </>
  );
}
