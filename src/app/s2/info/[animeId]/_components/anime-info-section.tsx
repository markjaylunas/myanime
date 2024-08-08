import ExpandDescription from "@/components/ui/ExpandDescription";
import Heading from "@/components/ui/Heading";
import { AWAnimeInfoDataSchema } from "@/lib/aniwatch-validations";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { ReactNode } from "react";

type Props = {
  anime: AWAnimeInfoDataSchema["anime"];
  className?: string;
  children?: ReactNode;
};

export default function AnimeInfoSection({
  anime,
  className,
  children,
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

      {children}

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
        className="mt-2 sm:mt-4"
        description={
          info.description ? `${info.description}` : "No description"
        }
        isHTML
      />
    </section>
  );
}
