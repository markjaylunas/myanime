import { Icons } from "@/components/ui/Icons";
import { AWAnimeInfoDataSchema } from "@/lib/aniwatch-validations";
import { cn } from "@/lib/utils";
import { Image } from "@nextui-org/image";

type Props = {
  anime: AWAnimeInfoDataSchema["anime"];
  classname?: string;
};

export default function PosterMoreInfo({ anime, classname }: Props) {
  const { info, moreInfo } = anime;
  return (
    <section className={cn("w-60 flex-none", classname)}>
      <Image isBlurred width={240} src={info.poster} alt={info.name} />

      <article className="space-y-2 mt-6">
        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500">Rating</span>{" "}
          <span className="flex gap-1 justify-center items-start">
            <Icons.startFill className="size-3 text-warning-500" />{" "}
            {moreInfo.malscore}
          </span>
        </p>
        <p className="flex justify-between text-tiny">
          <span className="text-foreground-500">Aired</span>{" "}
          <span>{moreInfo.aired}</span>
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
          <span className="text-foreground-500">{info.stats.type}</span>{" "}
          <span>{info.stats.duration}</span>
        </p>
      </article>
    </section>
  );
}
