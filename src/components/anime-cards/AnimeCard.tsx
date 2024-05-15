import { AnimeCardProps } from "@/lib/types";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";

export default function AnimeCard(anime: AnimeCardProps) {
  const isEpisode = Boolean(anime.episodeId && anime.episodeNumber);
  let href = `/info/${anime.id}`;
  if (isEpisode)
    href = `${href}/watch/${anime.episodeId}/${anime.episodeNumber}`;

  return (
    <Card
      as={Link}
      href={href}
      className="relative h-full w-full mx-auto aspect-2/3 bg-gray-600 select-none hover:cursor-pointer overflow-hidden"
    >
      <CardHeader className="absolute z-20 top-0 p-2 flex justify-between items-start">
        {anime.rank && (
          <Chip radius="sm" size="sm" color="warning" variant="shadow">
            {anime.rank}
          </Chip>
        )}

        {anime.releaseDate && (
          <Chip radius="sm" size="sm" color="success" variant="shadow">
            {anime.releaseDate}
          </Chip>
        )}
      </CardHeader>
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/80  via-black/20 to-transparent" />
      <Image
        alt={anime.title}
        className="z-0 w-full h-full object-cover"
        src={anime.image}
        classNames={{
          wrapper: "w-full h-full mx-auto bg-blur-md",
          img: "object-cover",
        }}
      />
      <CardFooter className="absolute z-20 bottom-0 p-2 flex flex-col gap-2 justify-start items-center">
        {isEpisode && (
          <Chip radius="sm" size="sm" color="primary" variant="shadow">
            Ep {anime.episodeNumber}
          </Chip>
        )}

        <h6 className="text-white font-medium text-md line-clamp-5 text-center text-pretty">
          {anime.title}
        </h6>
      </CardFooter>
    </Card>
  );
}
