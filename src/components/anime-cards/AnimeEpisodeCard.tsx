import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Progress } from "@nextui-org/react";
import moment from "moment";
import NextLink from "next/link";

export type AnimeEpisodeCardProps = {
  id: string;
  animeId: string | null;
  animeTitle: string | null;
  animeImage: string | null;
  episodeId: string | null;
  episodeTitle: string | null;
  episodeNumber: number | null;
  episodeImage: string | null;
  episodeProgressUpdatedAt: Date;
  currentTime: number;
  durationTime: number | null;
  server: string | null;
  serverAnimeId: string | null;
  serverEpisodeId: string | null;
};

export default function AnimeEpisodeCard({
  animeImage,
  animeTitle,
  currentTime,
  durationTime,
  episodeImage,
  episodeNumber,
  episodeProgressUpdatedAt,
  episodeTitle,
  server,
  serverAnimeId,
  serverEpisodeId,
}: AnimeEpisodeCardProps) {
  let href = `/${server}/info/${serverAnimeId}/watch/${serverEpisodeId}/${episodeNumber}`;
  // todo: add server tag to card if progress is on different server
  return (
    <Card
      as={NextLink}
      href={href}
      className="relative h-full w-full mx-auto aspect-video bg-gray-600 select-none hover:cursor-pointer overflow-hidden"
    >
      <CardHeader className="absolute z-20 top-0 p-2 flex flex-col w-full gap-1">
        <div className="flex flex-wrap gap-2 justify-between items-start w-full">
          <Chip radius="sm" size="sm" color="secondary" variant="shadow">
            EP {episodeNumber}
          </Chip>
          <Chip radius="sm" size="sm" color="default" variant="shadow">
            {moment(episodeProgressUpdatedAt).fromNow()}
          </Chip>
        </div>
        <div className="flex justify-end w-full">
          <Chip radius="sm" size="sm" color="success" variant="bordered">
            Server&nbsp;{server === "s1" ? "1" : "2"}
          </Chip>
        </div>
      </CardHeader>

      <div className="absolute z-10 w-[101%] h-[101%] bg-gradient-to-t from-black/80  via-black/40 to-transparent" />
      <Image
        alt={episodeTitle || animeTitle || ""}
        src={episodeImage || animeImage || ""}
        classNames={{
          wrapper:
            "z-0 w-full h-full mx-auto bg-blur-md flex items-center justify-center",
          img: "object-cover min-w-full min-h-full",
        }}
      />
      <CardFooter className="absolute z-20 bottom-0 p-2 flex flex-col gap-2 justify-start items-center">
        <h6 className="text-white font-medium text-md line-clamp-1 text-center text-pretty">
          {episodeTitle}
        </h6>
        <h6 className="text-white font-medium text-xs line-clamp-1 text-center text-pretty">
          {animeTitle}
        </h6>

        {/* percentage of currrentTime on durationTime */}
        <Progress
          value={(currentTime / (durationTime || 0)) * 100}
          size="sm"
          aria-label={`${currentTime} / ${durationTime}`}
        />
      </CardFooter>
    </Card>
  );
}
