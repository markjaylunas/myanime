import { AWAnimeSchema } from "@/lib/aniwatch-validations";
import { cn } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { Icons } from "../ui/Icons";

type Props = {
  anime: AWAnimeSchema;
  query?: string;
};

export default function AnimeCard({ anime, query = "" }: Props) {
  return (
    <Card
      as={Link}
      href={`/s2/info/${anime.id}${query}`}
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
          {Boolean(anime.episodes?.sub) && (
            <Chip
              size="sm"
              radius="sm"
              color="primary"
              variant="shadow"
              className={cn(
                "text-xs mx-auto space-x-1",
                anime.episodes?.dub && "rounded-r-none"
              )}
              startContent={<Icons.closedCaption className="size-3" />}
            >
              {anime.episodes?.sub}
            </Chip>
          )}

          {Boolean(anime.episodes?.dub) && (
            <Chip
              radius="sm"
              size="sm"
              color="secondary"
              variant="shadow"
              className={cn("text-xs", anime.episodes?.sub && "rounded-l-none")}
              startContent={<Icons.microphone className="size-3" />}
            >
              {anime.episodes?.dub}
            </Chip>
          )}
        </div>

        {anime.isCurrent && (
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
              radius="sm"
              size="sm"
              color="danger"
              variant="bordered"
              className="text-xs ml-auto"
            >
              {anime.rating}
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
