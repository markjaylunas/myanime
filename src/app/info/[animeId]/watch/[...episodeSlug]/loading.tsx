import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="w-full aspect-video" />
      <Skeleton className="rounded-xl w-full h-8 mt-2" />
    </>
  );
}
