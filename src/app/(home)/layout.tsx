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
    <main className="container max-w-5xl mx-auto min-h-screen px-8">
      {children}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Popular
      </Heading>
      {popular}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Recent Episodes
      </Heading>
      {recentepisodes}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Top Airing
      </Heading>
      {topairing}

      <Spacer y={4} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        Movies
      </Heading>
      {movies}

      <Spacer y={8} />

      <Heading order="2xl" className="text-gray-700 dark:text-gray-300 ">
        All
      </Heading>
      {animelist}
    </main>
  );
}
