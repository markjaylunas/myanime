import { Skeleton } from "@nextui-org/skeleton";

export default function AnimeCardSkeleton() {
  return (
    <Skeleton className="rounded-lg h-[200px] sm:h-[250px] md:h-[300px] aspect-2/3 bg-transparent select-none hover:cursor-pointer" />
  );
}
