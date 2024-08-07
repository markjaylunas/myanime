"use client";

import { Icons } from "@/components/ui/Icons";
import { AWEpisodesDataSchema } from "@/lib/aniwatch-validations";
import { cn, encodeEpisodeId } from "@/lib/utils";
import { useDebouncedCallback } from "@mantine/hooks";
import { Button } from "@nextui-org/button";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

type Props = {
  episodeList: AWEpisodesDataSchema["episodes"];
  totalEpisodes: AWEpisodesDataSchema["totalEpisodes"];
  className?: string;
};

export default function EpisodeListSection({
  episodeList,
  totalEpisodes,
  className,
}: Props) {
  const { animeId, episodeSlug } = useParams<{
    animeId: string;
    episodeSlug: string[];
  }>();

  let activeEpisodeNumber = -1;
  let title = "";
  if (episodeSlug && episodeSlug.length > 0) {
    activeEpisodeNumber = parseInt(episodeSlug[1]);
    const episode = episodeList.find(
      (episode) => episode.number === activeEpisodeNumber
    );
    title = `Now playing EP ${activeEpisodeNumber} of ${totalEpisodes}  ${
      episode?.title ? `- ${episode?.title}` : ""
    }`;
  }

  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isListView, setIsListView] = useState(true);
  const [episodeSpotlight, setEpisodeSpotlight] = useState<number>(-1);

  const handleEpisodeSearchChange = useDebouncedCallback((value: string) => {
    const episodeNumber = parseInt(value, 10);
    const episodeIndex = episodeList.findIndex(
      (episode) => episode.number === episodeNumber
    );
    setEpisodeSpotlight(episodeNumber);

    if (episodeIndex !== -1 && episodeRefs.current[episodeIndex]) {
      episodeRefs.current[episodeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return value;
  }, 500);

  return (
    <section className={cn("space-y-3 min-w-[300px]", className)}>
      {activeEpisodeNumber && (
        <p className="text-gray-500 line-clamp-2">{title}</p>
      )}

      <div className="flex justify-start gap-3">
        <Button
          onPress={() => setIsListView((v) => !v)}
          isIconOnly
          variant="bordered"
          startContent={isListView ? <Icons.listOrdered /> : <Icons.grid />}
        />

        <Input
          type="number"
          aria-label="search episode number"
          startContent={<Icons.search />}
          className="max-w-36"
          placeholder="Episode No."
          onValueChange={handleEpisodeSearchChange}
        />
      </div>
      <ScrollShadow className="w-full max-h-[400px]">
        {isListView ? (
          <Listbox
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            // defaultSelectedKeys={activeEpisodeId || ""}
          >
            {episodeList.map((episode, episodeIdx) => (
              <ListboxItem
                startContent={episode.number}
                color={episode.isFiller ? "warning" : "primary"}
                textValue={episode.title}
                href={`/s2/info/${animeId}/watch/${encodeEpisodeId(
                  episode.episodeId
                )}/${episode.number}`}
                className={cn(
                  "pl-2",
                  episodeSpotlight === episode.number && "text-secondary-500"
                )}
                endContent={
                  episode.number === activeEpisodeNumber ? (
                    <Icons.playFill className="size-3" />
                  ) : (
                    ""
                  )
                }
                key={episode.episodeId}
              >
                <div
                  ref={(el) => {
                    episodeRefs.current[episodeIdx] = el;
                  }}
                >
                  {episode.title}
                </div>
              </ListboxItem>
            ))}
          </Listbox>
        ) : (
          <div className="flex flex-wrap justify-start flex-grow gap-2 mx-auto">
            {episodeList.map((episode, episodeIdx) => (
              <Button
                as={NextLink}
                href={`/s2/info/${animeId}/watch/${encodeEpisodeId(
                  episode.episodeId
                )}/${episode.number}`}
                variant={
                  episode.number === episodeSpotlight ? "shadow" : "flat"
                }
                radius="md"
                color="primary"
                key={episode.episodeId}
                isIconOnly
              >
                <div
                  ref={(el) => {
                    episodeRefs.current[episodeIdx] = el;
                  }}
                >
                  {episode.number === activeEpisodeNumber ? (
                    <Icons.playFill />
                  ) : (
                    episode.number
                  )}
                </div>
              </Button>
            ))}
          </div>
        )}
      </ScrollShadow>
    </section>
  );
}
