import { ReactNode } from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-8 md:px-4 space-y-8">
      {children}
    </main>
  );
}
