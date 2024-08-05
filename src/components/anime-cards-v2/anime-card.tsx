import { AWAnimeSchema } from "@/lib/aniwatch-validations";
import { cn } from "@/lib/utils";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { Icons } from "../ui/Icons";

export default function AnimeCard(anime: AWAnimeSchema) {
  return (
    <Card
      as={Link}
      href={`s2/info/${anime.id}`}
      className="relative h-full w-full mx-auto aspect-2/3 bg-gray-600 select-none hover:cursor-pointer overflow-hidden"
    >
      <CardHeader className="absolute z-20 top-0 p-2 flex flex-wrap gap-2 justify-between items-start">
        {anime.duration && (
          <Chip radius="sm" size="sm" color="default" variant="shadow">
            {anime.duration}
          </Chip>
        )}

        {anime.type && (
          <Chip radius="sm" size="sm" color="secondary" variant="shadow">
            {anime.type}
          </Chip>
        )}
      </CardHeader>
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/80  via-black/20 to-transparent" />
      <Image
        alt={anime.name}
        src={anime.poster}
        classNames={{
          wrapper:
            "z-0 w-full h-full mx-auto bg-blur-md flex items-center justify-center",
          img: "object-cover min-w-full min-h-full",
        }}
      />
      <CardFooter className="absolute z-20 bottom-0 p-2 flex flex-col gap-2">
        {anime.rating && (
          <Chip
            radius="sm"
            size="sm"
            color="warning"
            variant="bordered"
            className="ml-auto"
          >
            {anime.rating}
          </Chip>
        )}
        <div className="flex justify-center items-center flex-wrap">
          {Boolean(anime.episodes?.sub) && (
            <Chip
              radius="sm"
              size="sm"
              color="primary"
              variant="shadow"
              className={cn(
                "mx-auto space-x-1",
                anime.episodes?.dub && "rounded-r-none"
              )}
              startContent={<Icons.closedCaption />}
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
              className={cn("", anime.episodes?.sub && "rounded-l-none")}
              startContent={<Icons.microphone />}
            >
              {anime.episodes?.dub}
            </Chip>
          )}
        </div>

        <h6 className="text-white font-medium text-md line-clamp-2 text-center text-pretty">
          {anime.name}
        </h6>
      </CardFooter>
    </Card>
  );
}
