import Heading from "@/components/ui/Heading";
import MyLink from "@/components/ui/MyLink";
import { Spacer } from "@nextui-org/spacer";
import { ReactNode } from "react";

export default async function HomeLayout({
  children,
  movies,
  popular,
  recentepisodes,
  topairing,
}: {
  children: ReactNode;
  movies: ReactNode;
  popular: ReactNode;
  recentepisodes: ReactNode;
  topairing: ReactNode;
}) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-8 md:px-4">
      {children}

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Popular
        </Heading>

        <MyLink href="/popular">View All</MyLink>
      </div>
      <Spacer y={2} />
      {popular}

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Top Airing
        </Heading>

        <MyLink href="/top-airing">View All</MyLink>
      </div>
      <Spacer y={2} />
      {topairing}

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Movies
        </Heading>

        <MyLink href="/movies">View All</MyLink>
      </div>
      <Spacer y={2} />
      {movies}

      <Spacer y={8} />

      <div className="flex justify-between">
        <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
          Recent Episodes
        </Heading>

        <MyLink href="/recent-episodes">View All</MyLink>
      </div>
      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Recent Episodes
      </Heading>
      <Spacer y={2} />
      {recentepisodes}

      <Spacer y={8} />
    </main>
  );
}
