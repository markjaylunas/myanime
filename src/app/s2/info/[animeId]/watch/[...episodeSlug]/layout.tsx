import { ReactNode } from "react";

export default async function HomeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { animeId: string; episodeSlug: string[] };
}) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen pb-8  p-0 space-y-4">
      {children}
    </main>
  );
}
