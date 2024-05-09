import { Anime } from "@/lib/types";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

type Props = {
  anime: Anime;
};

export default function AnimeCard({ anime }: Props) {
  const href = `/info/${anime.id}`;
  const title =
    anime.title.english || anime.title.romaji || anime.title.native || anime.id;
  return (
    <Card
      radius="lg"
      className="rounded-lg h-[200px] sm:h-[250px] md:h-[300px] aspect-2/3 bg-transparent select-none hover:cursor-pointer"
    >
      {/* <CardHeader className="absolute z-10 top-0 w-full flex justify-end items-start p-2">
        {anime.subOrDub === "dub" && (
          <Chip color="secondary" size="sm" radius="lg">
            DUB
          </Chip>
        )}
      </CardHeader> */}
      <Image
        removeWrapper
        alt={title}
        className="z-0 w-full h-full object-cover"
        src={anime.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <CardFooter className="absolute z-10 bottom-0 p-4 flex justify-center items-start">
        <Link href={href}>
          <h4 className="text-white font-bold text-xs md:text-lg line-clamp-3 text-center text-pretty">
            {title}
          </h4>
        </Link>
        <section></section>
      </CardFooter>
    </Card>
  );
}
