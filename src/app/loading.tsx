import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <Spinner size="lg" />
    </main>
  );
}
