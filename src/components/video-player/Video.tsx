"use client";

import { useEffect, useRef, useState } from "react";

import { AnimeInfo, EpisodeSource } from "@/lib/types";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Spinner } from "@nextui-org/spinner";
import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  //   Track,
  useMediaState,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import NextLink from "next/link";
import { Icons } from "../ui/Icons";

// import { textTracks } from "./tracks";

type Props = {
  episodeSource: EpisodeSource;
  info: AnimeInfo;
  episodeId: string;
  episodeNumber: string;
};

const sourcePriority = ["1080p", "720p", "480p", "360p", "default", "backup"];

export default function Video({ episodeSource, info, episodeNumber }: Props) {
  const about = `Episode ${episodeNumber || 1} - ${info.title}`;
  const sortedSources = episodeSource.sources
    ? episodeSource.sources.sort((a, b) => {
        return (
          sourcePriority.indexOf(a.quality) - sourcePriority.indexOf(b.quality)
        );
      })
    : [];

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

  const defaultSource = sortedSources[0];
  const [selectedSource, setSelectedSource] = useState(defaultSource);
  const [direction, setDirection] = useState<
    "prev" | "next" | "first" | "last" | null
  >(null);

  let player = useRef<MediaPlayerInstance>(null),
    canPlay = useMediaState("canPlay", player),
    [src, setSrc] = useState("");

  useEffect(() => {
    // Initialize src.
    setSrc(defaultSource.url);

    // Subscribe to state updates.
    return player.current!.subscribe(({ paused, viewType }) => {
      // console.log('is paused?', '->', paused);
      // console.log('is audio view?', '->', viewType === 'audio');
    });
  }, []);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent
  ) {
    // ...
  }

  return (
    <section className="overflow-hidden">
      <MediaPlayer
        streamType="on-demand"
        aspectRatio="16/9"
        load="visible"
        posterLoad="visible"
        title={about}
        src={src}
        crossorigin
        playsinline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
      >
        <MediaProvider>
          <Poster className="vds-poster" src={info.image} alt={about} />
          {/* {textTracks.map((track) => (
            <Track {...track} key={track.src} />
          ))} */}
        </MediaProvider>

        {/* Layouts */}
        <DefaultAudioLayout icons={defaultLayoutIcons} />
        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          // thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
        />
      </MediaPlayer>

      <div className="flex justify-center">
        <ButtonGroup variant="flat" color="secondary" size="sm" fullWidth>
          <Button
            as={NextLink}
            isDisabled={
              direction !== null ||
              !info.episodes ||
              info.episodes.length === 0 ||
              currentEpisodeIndex === 0
            }
            href={
              info.episodes && info.episodes.length > 0
                ? `/info/${info.id}/watch/${info.episodes[0].id}/${info.episodes[0].number}`
                : ""
            }
            onClick={() => setDirection("first")}
            startContent={
              direction === "first" ? (
                <Spinner size="sm" color="secondary" />
              ) : (
                <Icons.chevronLeftDouble className="size-5" />
              )
            }
          >
            First
          </Button>
          <Button
            as={NextLink}
            isDisabled={direction !== null || !prevEpisode}
            href={
              prevEpisode
                ? `/info/${info.id}/watch/${prevEpisode.id}/${prevEpisode.number}`
                : ""
            }
            onClick={() => setDirection("prev")}
            startContent={
              direction === "prev" ? (
                <Spinner size="sm" color="secondary" />
              ) : (
                <Icons.chevronLeft className="size-5" />
              )
            }
          >
            Prev
          </Button>
          <Dropdown placement="top">
            <DropdownTrigger>
              <Button isDisabled={direction !== null}>
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
                const selectedSource = sortedSources.find(
                  (source) => source.quality === key
                );

                if (!selectedSource) return;
                setSelectedSource(selectedSource);
                setSrc(selectedSource.url);
                return keySet;
              }}
              className="max-w-[300px]"
            >
              {sortedSources.map((source) => (
                <DropdownItem key={source.quality}>
                  {source.quality}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            as={NextLink}
            isDisabled={direction !== null || !nextEpisode}
            href={
              nextEpisode
                ? `/info/${info.id}/watch/${nextEpisode.id}/${nextEpisode.number}`
                : ""
            }
            onClick={() => setDirection("next")}
            endContent={
              direction === "next" ? (
                <Spinner size="sm" color="secondary" />
              ) : (
                <Icons.chevronRight className="size-5" />
              )
            }
          >
            Next
          </Button>
          <Button
            as={NextLink}
            isDisabled={
              direction !== null ||
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
            onClick={() => setDirection("last")}
            endContent={
              direction === "last" ? (
                <Spinner size="sm" color="secondary" />
              ) : (
                <Icons.chevronRightDouble className="size-5" />
              )
            }
          >
            Last
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
}
