"use client";

import { Dispatch, SetStateAction } from "react";

import { AnimeInfo, EpisodeSource } from "@/lib/types";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import NextLink from "next/link";
import { Icons } from "../ui/Icons";

type Props = {
  sourceList: EpisodeSource[];
  selectedSource: EpisodeSource;
  info: AnimeInfo;
  episodeNumber: number;
  setSelectedSource: Dispatch<SetStateAction<EpisodeSource>>;
};

export default function VideoControl({
  selectedSource,
  setSelectedSource,
  sourceList,
  info,
  episodeNumber,
}: Props) {
  const currentEpisodeIndex = info.episodes
    ? info.episodes.findIndex(
        (episode) => episode.number === Number(episodeNumber)
      )
    : -1;

  const prevEpisode =
    info.episodes && currentEpisodeIndex > 0
      ? info.episodes[currentEpisodeIndex - 1]
      : null;
  const nextEpisode =
    info.episodes &&
    currentEpisodeIndex >= 0 &&
    currentEpisodeIndex < info.episodes.length - 1
      ? info.episodes[currentEpisodeIndex + 1]
      : null;

  return (
    <ButtonGroup
      className="flex justify-center"
      variant="flat"
      color="secondary"
      size="sm"
      fullWidth
    >
      <Button
        as={NextLink}
        isDisabled={
          !info.episodes ||
          info.episodes.length === 0 ||
          currentEpisodeIndex === 0
        }
        href={
          info.episodes && info.episodes.length > 0
            ? `/info/${info.id}/watch/${info.episodes[0].id}/${info.episodes[0].number}`
            : ""
        }
        startContent={<Icons.chevronLeftDouble className="size-5" />}
      >
        First
      </Button>
      <Button
        as={NextLink}
        isDisabled={!prevEpisode}
        href={
          prevEpisode
            ? `/info/${info.id}/watch/${prevEpisode.id}/${prevEpisode.number}`
            : ""
        }
        startContent={<Icons.chevronLeft className="size-5" />}
      >
        Prev
      </Button>
      <Dropdown placement="top">
        <DropdownTrigger>
          <Button>
            {selectedSource.quality}
            <Icons.chevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="bordered"
          color="secondary"
          disallowEmptySelection
          aria-label="Video Source"
          selectionMode="single"
          onSelectionChange={(keySet) => {
            const keyArray = Array.from(keySet);
            const key = keyArray[0];
            const source = sourceList.find((source) => source.quality === key);

            if (!source) return;
            setSelectedSource(source);
            return keySet;
          }}
          className="max-w-[300px]"
        >
          {sourceList.map((source) => (
            <DropdownItem key={source.quality}>{source.quality}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button
        as={NextLink}
        isDisabled={!nextEpisode}
        href={
          nextEpisode
            ? `/info/${info.id}/watch/${nextEpisode.id}/${nextEpisode.number}`
            : ""
        }
        endContent={<Icons.chevronRight className="size-5" />}
      >
        Next
      </Button>
      <Button
        as={NextLink}
        isDisabled={
          !info.episodes ||
          info.episodes.length === 0 ||
          currentEpisodeIndex === info.episodes.length - 1
        }
        href={
          info.episodes && info.episodes.length > 0
            ? `/info/${info.id}/watch/${
                info.episodes[info.episodes.length - 1].id
              }/${info.episodes[info.episodes.length - 1].number}`
            : ""
        }
        endContent={<Icons.chevronRightDouble className="size-5" />}
      >
        Last
      </Button>
    </ButtonGroup>
  );
}
