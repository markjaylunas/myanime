import { Spacer } from "@nextui-org/spacer";
import SearchInput from "./_components/SearchInput";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-2 space-y-4">
      <SearchInput />

      <Spacer y={4} />
      {children}
    </main>
  );
}
