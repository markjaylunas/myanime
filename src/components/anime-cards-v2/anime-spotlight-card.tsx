import { AWAnimeSchema } from "@/lib/aniwatch-validations";
import { cn } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import { Icons } from "../ui/Icons";

type Color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

export default function AnimeSpotlightCard(anime: AWAnimeSchema) {
  const server = "s2";
  const colorMap: Color[] = ["warning", "default", "success", "warning"];

  const otherInfoList = colorMap
    .map((color, colorIdx) => ({
      value: anime.otherInfo ? anime.otherInfo[colorIdx] : "",
      color,
    }))
    .filter((v) => v.value);

  return (
    <Card
      radius="none"
      className="relative
       h-full w-full mx-auto aspect-square sm:aspect-3/1 bg-gray-600 select-none overflow-hidden"
    >
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black via-black/20  to-transparent" />
      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-r from-black via-black/40 to-transparent" />

      <Image
        alt={anime.name}
        src={anime.poster}
        classNames={{
          wrapper:
            "z-0 w-full h-full mx-auto bg-blur-md flex items-start justify-end -mt-2",
          img: "object-cover object-right-middle min-w-full min-h-full",
        }}
      />

      {Boolean(anime.rank) && (
        <p className="absolute z-20 top-1/3 right-2 text-9xl font-black text-white/75">
          {anime.rank}
        </p>
      )}

      <CardFooter className="absolute z-20 bottom-0 p-2 flex items-start flex-col gap-3">
        <h6 className=" text-white font-bold text-2xl sm:text-4xl w-2/3 line-clamp-3 sm:line-clamp-2 text-left">
          {anime.name}
        </h6>

        <section className="flex flex-wrap gap-2 w-2/3">
          {otherInfoList &&
            otherInfoList.map((info) => (
              <Chip
                radius="sm"
                size="sm"
                color={info.color}
                variant="bordered"
                className="text-xs"
                key={info.value}
              >
                {info.value}
              </Chip>
            ))}

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
                className={cn(
                  "text-xs",
                  anime.episodes?.sub && "rounded-l-none"
                )}
                startContent={<Icons.microphone className="size-3" />}
              >
                {anime.episodes?.dub}
              </Chip>
            )}
          </div>
        </section>

        <p className="text-foreground-500 text-tiny sm:text-base w-1/2 line-clamp-3 sm:line-clamp-2 text-left">
          {anime.description}
        </p>

        <ButtonGroup color="primary" className="">
          <Button
            as={NextLink}
            href={`/${server}/info/${anime.id}?watch=true`}
            className="text-xl font-medium"
          >
            Watch Now
          </Button>
          <Button
            as={NextLink}
            href={`/${server}/info/${anime.id}`}
            variant="bordered"
            className="text-xl font-medium"
          >
            Detail
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
