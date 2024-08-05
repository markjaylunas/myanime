import Heading from "@/components/ui/Heading";
import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { ReactNode, Suspense } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4 space-y-4">
      <Heading>My List</Heading>

      {/* <WatchListTabs /> */}

      <Suspense
        fallback={
          <Card>
            <CardBody>
              <Skeleton className="w-full min-h-screen" />
            </CardBody>
          </Card>
        }
      >
        {children}
      </Suspense>
    </main>
  );
}
