import ExpandDescription from "@/components/ui/ExpandDescription";
import Heading from "@/components/ui/Heading";
import { AWAnimeInfoDataSchema } from "@/lib/aniwatch-validations";
import { cn } from "@/lib/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import NextLink from "next/link";

type Props = {
  anime: AWAnimeInfoDataSchema["anime"];
  watchLink: string | null;
  latestLink: string | null;
  className?: string;
};

export default function AnimeInfoSection({
  anime,
  className,
  latestLink,
  watchLink,
}: Props) {
  const info = { ...anime.info, ...anime.moreInfo };

  return (
    <section className={cn("space-y-6", className)}>
      <Heading className="hidden sm:block" order={"6xl"}>
        {info.name}
      </Heading>
      <h2 className="hidden sm:block text-xs text-foreground-500">
        {Array.from(new Set([info.synonyms])).join(" | ")}
      </h2>

      <ButtonGroup className="w-full sm:w-fit">
        <Button
          as={NextLink}
          href={watchLink || ""}
          size="lg"
          color="primary"
          className="text-xl font-semibold"
          isDisabled={watchLink === null}
        >
          Watch Now
        </Button>
        <Button
          as={NextLink}
          href={latestLink || ""}
          size="lg"
          color="primary"
          variant="bordered"
          className="text-xl font-semibold"
          isDisabled={latestLink === null}
        >
          Latest
        </Button>
      </ButtonGroup>

      {info.genres && (
        <div className="flex flex-wrap gap-2">
          {info.genres.map((genre) => (
            <Button
              as={NextLink}
              href={`/s1/genre?genres=[${genre}]`}
              key={genre}
              color="secondary"
              variant="bordered"
              radius="full"
              size="sm"
            >
              {genre}
            </Button>
          ))}
        </div>
      )}

      <ExpandDescription
        className="mt-4"
        description={`${info.description}`}
        isHTML
      />
    </section>
  );
}
