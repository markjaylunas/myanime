import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col justify-center items-center">
      <Skeleton className="w-full aspect-video" />
      <Skeleton className="rounded-xl w-full h-8 mt-2" />
      <Skeleton className="rounded-xl max-w-60 w-full h-8 mt-4" />
    </section>
  );
}
