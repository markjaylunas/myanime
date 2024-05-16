import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <Spinner size="lg" />
    </section>
  );
}
