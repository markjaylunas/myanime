import IMGAnimeFast from "@/assets/anime_fast.gif";
import IMGAnimeSlow from "@/assets/anime_slow.gif";
import Heading from "@/components/ui/Heading";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Image from "next/image";
import NextLink from "next/link";

export default async function MainHomePage() {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4">
      <Heading
        order="4xl"
        className="text-gray-700 dark:text-gray-300 text-center mt-0 sm:mt-8"
      >
        My Anime
      </Heading>

      <Heading className="text-gray-600 dark:text-gray-400 text-center mt-3 sm:mt-8">
        Select Your Streaming Server
      </Heading>

      <section className="max-w-[900px] flex gap-2 flex-col sm:flex-row px-8 mt-2 sm:mt-4 mx-auto">
        <Card
          as={NextLink}
          href="/s1"
          isFooterBlurred
          className="w-full"
          isPressable
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Server 1</h4>
            <small className="text-default-500">
              Reliable but may experience slower speeds.
            </small>
            <p className="text-tiny uppercase font-bold">Original server</p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              unoptimized
              alt="slow server"
              className="object-cover rounded-xl w-full scale-x-[-1]"
              src={IMGAnimeSlow}
              width={270}
            />
          </CardBody>
          <CardFooter className=" z-10">
            <Button
              as={NextLink}
              href="/s1"
              variant="shadow"
              color="secondary"
              radius="lg"
              fullWidth
            >
              Watch on Server 1
            </Button>
          </CardFooter>
        </Card>
        <Card
          as={NextLink}
          href="/s2"
          isPressable
          isFooterBlurred
          className="w-full"
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <section className="w-full flex justify-between">
              <h4 className="font-bold text-large">Server 2</h4>
              <Chip color="danger" size="sm">
                Recommended
              </Chip>
            </section>
            <small className="text-default-500">
              Faster and more efficient for a smoother viewing experience.
            </small>
            <p className="text-tiny uppercase font-bold">
              New and improved server
            </p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              unoptimized
              alt="fast server"
              className="object-cover rounded-xl w-full scale-x-[-1]"
              src={IMGAnimeFast}
              width={270}
            />
          </CardBody>
          <CardFooter className=" z-10">
            <Button
              as={NextLink}
              href="/s2"
              variant="shadow"
              color="primary"
              radius="lg"
              fullWidth
            >
              Watch on Server 2
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
