import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="w-full aspect-video" />
      <Skeleton className="rounded-xl w-full h-8 mt-2" />
      <section className="flex justify-center items-center">
        <Skeleton className="rounded-xl max-w-60 w-full h-8 mt-4" />
      </section>

      <section className="px-2 mt-6 space-y-2">
        <Skeleton className="rounded-xl max-w-28 w-full h-8 mt-4" />
        <Skeleton className="rounded-xl h-64 w-full" />
      </section>
    </>
  );
}
