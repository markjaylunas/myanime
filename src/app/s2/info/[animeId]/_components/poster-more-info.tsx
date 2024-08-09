import { Icons } from "@/components/ui/Icons";
import { AWAnimeInfoDataSchema } from "@/lib/aniwatch-validations";
import { cn } from "@/lib/utils";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";

type Props = {
  anime: AWAnimeInfoDataSchema["anime"];
  classname?: string;
};

export default function PosterMoreInfo({ anime, classname }: Props) {
  const { info, moreInfo } = anime;

  return (
    <section
      className={cn(
        "flex-none flex items-start  gap-2 flex-row sm:flex-col",
        classname
      )}
    >
      <div className="w-48 flex-1">
        <Image isBlurred width={240} src={info.poster} alt={info.name} />
      </div>

      <article className="space-y-2 w-full flex-1">
        <div className="flex justify-between items-start ">
          {info.stats.type && (
            <Chip
              radius="sm"
              size="sm"
              color="warning"
              variant="shadow"
              className="text-xs"
            >
              {info.stats.type}
            </Chip>
          )}
          <div className="flex justify-center items-center ">
            {Boolean(info.stats.episodes?.sub) && (
              <Chip
                size="sm"
                radius="sm"
                color="primary"
                variant="shadow"
                className={cn(
                  "text-xs mx-auto space-x-1",
                  info.stats.episodes?.dub && "rounded-r-none"
                )}
                startContent={<Icons.closedCaption className="size-3" />}
              >
                {info.stats.episodes?.sub}
              </Chip>
            )}

            {Boolean(info.stats.episodes?.dub) && (
              <Chip
                radius="sm"
                size="sm"
                color="secondary"
                variant="shadow"
                className={cn(
                  "text-xs",
                  info.stats.episodes?.sub && "rounded-l-none"
                )}
                startContent={<Icons.microphone className="size-3" />}
              >
                {info.stats.episodes?.dub}
              </Chip>
            )}
          </div>
        </div>

        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500">Rating</span>{" "}
          <span className="flex gap-1 justify-center items-start">
            <Icons.startFill className="size-3 text-warning-500" />{" "}
            {moreInfo.malscore}
          </span>
        </p>
        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500 pr-2">Aired</span>{" "}
          <span className="text-right">{moreInfo.aired}</span>
        </p>
        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500">Status</span>{" "}
          <span>{moreInfo.status}</span>
        </p>
        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500">Episodes</span>{" "}
          <span>{info.stats.episodes?.sub || 0}</span>
        </p>
        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500">Duration</span>{" "}
          <span>{moreInfo.duration}</span>
        </p>

        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500">Premiered</span>{" "}
          <span>{moreInfo.premiered}</span>
        </p>

        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500">Studios</span>{" "}
          <span>{moreInfo.studios}</span>
        </p>

        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500 pr-2">Producers</span>{" "}
          <span className="text-right">
            {moreInfo.producers ? moreInfo.producers.join("\n") : "?"}
          </span>
        </p>
      </article>
    </section>
  );
}
