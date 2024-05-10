import Heading from "@/components/ui/Heading";
import { Spacer } from "@nextui-org/spacer";
import { ReactNode } from "react";

export default async function HomeLayout({
  children,
  animelist,
  movies,
  popular,
  recentepisodes,
  topairing,
}: {
  children: ReactNode;
  animelist: ReactNode;
  movies: ReactNode;
  popular: ReactNode;
  recentepisodes: ReactNode;
  topairing: ReactNode;
}) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 md:px-4">
      {children}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Popular
      </Heading>
      <Spacer y={2} />
      {popular}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Recent Episodes
      </Heading>
      <Spacer y={2} />
      {recentepisodes}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Top Airing
      </Heading>
      <Spacer y={2} />
      {topairing}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Movies
      </Heading>
      <Spacer y={2} />
      {movies}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        All
      </Heading>
      <Spacer y={2} />
      {animelist}
    </main>
  );
}
