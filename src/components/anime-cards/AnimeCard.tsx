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
  let href = `/s1/info/${anime.id}`;
  if (isEpisode && anime.episodeId !== "undefined")
    href = `${href}/watch/${anime.episodeId}/${anime.episodeNumber}`;
  const title = pickTitle(anime.title);

  return (
    <Card
      as={Link}
      href={href}
      className="relative h-full w-full mx-auto aspect-2/3 bg-gray-600 select-none hover:cursor-pointer overflow-hidden"
    >
      <CardHeader className="absolute z-20 top-0 p-2 flex flex-wrap gap-2 justify-between items-start">
        {anime.rank && (
          <Chip size="sm" color="warning" variant="shadow">
            {anime.rank}
          </Chip>
        )}

        {anime.airingAt && (
          <Chip size="sm" color="warning" variant="shadow">
            {formatTimestamp(anime.airingAt)}
          </Chip>
        )}

        {!anime.airingAt && anime.releaseDate && (
          <Chip size="sm" color="success" variant="shadow">
            {anime.releaseDate}
          </Chip>
        )}

        {anime.duration && (
          <Chip size="sm" color="default" variant="shadow">
            {formatDuration(anime.duration)}
          </Chip>
        )}

        {anime.type && (
          <Chip size="sm" color="secondary" variant="shadow">
            {anime.type.split("_").join(" ")}
          </Chip>
        )}
      </CardHeader>
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/80  via-black/20 to-transparent" />
      <Image
        alt={title}
        src={anime.image}
        classNames={{
          wrapper:
            "z-0 w-full h-full mx-auto bg-blur-md flex items-center justify-center",
          img: "object-cover min-w-full min-h-full",
        }}
      />
      <CardFooter className="absolute z-20 bottom-0 p-2 flex flex-col gap-2 justify-start items-center">
        {anime.rating && (
          <Chip
            startContent={<Icons.star className="mr-1" />}
            size="sm"
            color="primary"
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
