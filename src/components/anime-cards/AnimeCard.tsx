import { AnimeSortedSchema } from "@/lib/meta-validations";
import { formatDuration, formatTimestamp, pickTitle } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { Icons } from "../ui/Icons";

export default function AnimeCard(
  anime: AnimeSortedSchema & { rank?: number }
) {
  const isEpisode = Boolean(anime.episodeId && anime.episodeNumber);
  let href = `/info/${anime.id}`;
  if (isEpisode && anime.episodeId !== "undefined")
    href = `${href}/watch/${anime.episodeId}/${anime.episodeNumber}`;
  const title = pickTitle(anime.title);

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

        {!anime.airingAt && anime.releaseDate && (
          <Chip radius="sm" size="sm" color="success" variant="shadow">
            {anime.releaseDate}
          </Chip>
        )}

        {anime.duration && (
          <Chip radius="sm" size="sm" color="default" variant="shadow">
            {formatDuration(anime.duration)}
          </Chip>
        )}

        {anime.type && (
          <Chip radius="sm" size="sm" color="secondary" variant="shadow">
            {anime.type}
          </Chip>
        )}

        {anime.airingAt && (
          <Chip radius="sm" size="sm" color="warning" variant="shadow">
            {formatTimestamp(anime.airingAt)}
          </Chip>
        )}
      </CardHeader>
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/80  via-black/20 to-transparent" />
      <Image
        alt={title}
        className="z-0 w-full h-full object-cover"
        src={anime.image}
        classNames={{
          wrapper: "w-full h-full mx-auto bg-blur-md",
          img: "object-cover",
        }}
      />
      <CardFooter className="absolute z-20 bottom-0 p-2 flex flex-col gap-2 justify-start items-center">
        {anime.rating && (
          <Chip
            startContent={<Icons.star className="mr-1" />}
            radius="sm"
            size="sm"
            color="warning"
            variant="shadow"
          >
            {anime.rating}
          </Chip>
        )}

        <h6 className="text-white font-medium text-md line-clamp-2 text-center text-pretty">
          {title}
        </h6>

        {anime.episodeTitle && (
          <p className="text-white font-normal text-xs line-clamp-1 text-center text-pretty">
            {anime.episodeTitle}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
