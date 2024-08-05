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
        className="text-gray-700 dark:text-gray-300 text-center mt-3 sm:mt-8"
      >
        My Anime
      </Heading>

      <Heading
        order="2xl"
        className="text-gray-600 dark:text-gray-400 text-center mt-3 sm:mt-8"
      >
        Select Your Streaming Server
      </Heading>

      <section className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 mt-2 sm:mt-4 mx-auto">
        <Card isFooterBlurred className="w-full col-span-12 sm:col-span-6">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Server 1</h4>
            <small className="text-default-500">
              Reliable but may experience slower speeds.
            </small>
            <p className="text-tiny uppercase font-bold">Original server</p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
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
        <Card isFooterBlurred className="w-full col-span-12 sm:col-span-6">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="w-full flex justify-between">
              <h4 className="font-bold text-large">Server 2</h4>
              <Chip color="danger" size="sm">
                Recommended
              </Chip>
            </div>
            <small className="text-default-500">
              Faster and more efficient for a smoother viewing experience.
            </small>
            <p className="text-tiny uppercase font-bold">
              New and improved server
            </p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
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
              color="secondary"
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
