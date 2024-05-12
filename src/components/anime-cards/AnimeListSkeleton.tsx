import AnimeCardSkeleton from "./AnimeCardSkeleton";

export default function AnimeListSkeleton({
  cardCount,
}: {
  cardCount?: number;
}) {
  return (
    <ul className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2 gap-y-6">
      {Array(cardCount)
        .fill(0)
        .map((_, index) => (
          <AnimeCardSkeleton key={index} />
        ))}
    </ul>
  );
}
