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
    <main className="container max-w-5xl mx-auto min-h-screen px-4">
      {children}
      {popular}
      {recentepisodes}
      {topairing}
      {movies}
      {animelist}
    </main>
  );
}
