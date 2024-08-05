import Heading from "@/components/ui/Heading";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";

export default async function MainHomePage() {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4">
      <Heading
        order="7xl"
        className="text-gray-700 dark:text-gray-300 text-center mt-8"
      >
        My Anime
      </Heading>

      <section>
        <Button as={NextLink} href="/s1">
          Server 1
        </Button>
        <Button as={NextLink} href="/s2">
          Server 2
        </Button>
      </section>
    </main>
  );
}
