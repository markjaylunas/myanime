"use client";

import { AnimeCardType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/Icons";

type Props = {
  anime: AnimeCardType;
  isRecentEpisode?: boolean;
};

export default function AnimeCard({ anime, isRecentEpisode }: Props) {
  const pathname = usePathname();

  const server = pathname.split("/")[1];
  let link = `${server}/info/${anime.id}`;

  if (isRecentEpisode) link = `${link}?latest=true`;

  return (
    <Card
      as={NextLink}
      href={link}
      className="relative
       h-full w-full mx-auto aspect-2/3 bg-gray-600 select-none hover:cursor-pointer overflow-hidden"
    >
      <CardHeader className="absolute z-20 top-0 p-2 flex flex-wrap gap-2 justify-between items-end">
        {anime.type && (
          <Chip
            radius="sm"
            size="sm"
            color="warning"
            variant="shadow"
            className="text-xs"
          >
            {anime.type}
          </Chip>
        )}
        <div className="flex justify-center items-center">
          {Boolean(anime?.sub) && (
            <Chip
              size="sm"
              radius="sm"
              color="primary"
              variant="shadow"
              className={cn(
                "text-xs mx-auto space-x-1",
                anime?.dub && "rounded-r-none"
              )}
              startContent={<Icons.closedCaption className="size-3" />}
            >
              {anime?.sub}
            </Chip>
          )}

          {Boolean(anime?.dub) && (
            <Chip
              radius="sm"
              size="sm"
              color="secondary"
              variant="shadow"
              className={cn("text-xs", anime?.sub && "rounded-l-none")}
              startContent={<Icons.microphone className="size-3" />}
            >
              {anime?.dub}
            </Chip>
          )}

          {Boolean(anime?.releaseDate) && (
            <Chip
              radius="sm"
              size="sm"
              color="secondary"
              variant="shadow"
              className={cn("text-xs", anime?.sub && "rounded-l-none")}
            >
              {anime?.releaseDate}
            </Chip>
          )}
        </div>

        {anime.isLatestSeason && (
          <Chip
            radius="sm"
            size="sm"
            color="success"
            variant="shadow"
            className="text-xs"
          >
            Latest Season
          </Chip>
        )}
      </CardHeader>

      <div
        className={cn(
          "absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/85 to-transparent",
          Boolean(anime.rank) ? "via-black/20" : "via-transparent"
        )}
      />

      <Image
        alt={anime.name}
        src={anime.poster}
        classNames={{
          wrapper:
            "z-0 w-full h-full mx-auto bg-blur-md flex items-center justify-center",
          img: "object-cover min-w-full min-h-full",
        }}
      />

      {Boolean(anime.rank) && (
        <p className="absolute z-20 top-1/3 right-2 text-8xl font-black text-white/75">
          {anime.rank}
        </p>
      )}

      <CardFooter className="absolute z-20 bottom-0 p-2 flex items-start flex-col gap-2">
        <div className="flex flex-wrap justify-between flex-row-reverse w-full">
          {Boolean(anime.duration) && (
            <Chip
              radius="sm"
              size="sm"
              color="default"
              variant="shadow"
              className="text-xs"
            >
              {anime.duration}
            </Chip>
          )}

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

          {anime.rated && (
            <Chip
              radius="sm"
              size="sm"
              color="danger"
              variant="bordered"
              className="text-xs ml-auto"
            >
              {anime.rated}
            </Chip>
          )}
        </div>

        <h6 className="w-full text-white font-normal text-sm line-clamp-2 text-left text-pretty">
          {anime.name}
        </h6>
      </CardFooter>
    </Card>
  );
}
