import { ReactNode } from "react";

export default async function ListLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4">
      {children}
    </main>
  );
}
