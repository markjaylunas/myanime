import { AnimeInfo } from "@/lib/types";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";

export default function AnimeCard(anime: AnimeInfo) {
  const href = `/info/${anime.id}`;
  return (
    <Card className="relative aspect-2/3 bg-transparent select-none hover:cursor-pointer overflow-hidden">
      <CardHeader className="absolute z-20 top-0 p-4 flex justify-end items-start">
        {anime.subOrDub === "dub" && (
          <Chip radius="sm" color="secondary">
            DUB
          </Chip>
        )}
      </CardHeader>
      <div className="absolute z-10 w-full h-full bg-gradient-to-t from-black/80  via-black/20 to-transparent" />
      <Image
        removeWrapper
        alt={anime.title}
        className="z-0 w-full h-full object-cover"
        src={anime.image}
      />
      <CardFooter className="absolute z-20 bottom-0 p-4 flex justify-center items-start">
        <Link href={href}>
          <h4 className="text-white font-bold text-xs md:text-lg line-clamp-3 text-center text-pretty">
            {anime.title}
          </h4>
        </Link>
        <section></section>
      </CardFooter>
    </Card>
  );
}
