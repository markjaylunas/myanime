"use client";

import { useEffect, useRef, useState } from "react";

import { sourcePriority } from "@/lib/constants";
import { EpisodeSource, EpisodeSourceData } from "@/lib/types";

import {
  MediaLoadedDataEvent,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  TimeSlider,
  Tooltip,
  useMediaRemote,
} from "@vidstack/react";

import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useParams } from "next/navigation";

import { EpisodeSourceDataSchema } from "@/lib/meta-validations";
import { Menu } from "@vidstack/react";
import { Icons } from "../ui/Icons";

// import { textTracks } from "./tracks";

type Props = {
  title: string;
  poster: string;
  episodeSource: EpisodeSourceDataSchema | null;
};

export default function VideoPlayer({
  title,
  poster,
  episodeSource: initialEpisodeSource,
}: Props) {
  const defaultEpisodeSource = initialEpisodeSource?.sources || [];
  const sortedSources = sortSources(defaultEpisodeSource);
  const { episodeSlug } = useParams<{ episodeSlug: string[] }>();
  const [_, episodeNumber] = episodeSlug;

  const [episodeSource, setEpisodeSource] = useState<EpisodeSource>(
    sortedSources[0]
  );
  const [timeBefore, setTimeBefore] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const handleEpisodeChange = async (episode: Episode | null) => {
  //   if (!episode) return;
  //   try {
  //     setIsLoading(true);
  //     const newSourceData = await fetchAnimeEpisodeSource({
  //       episodeId: episode.id,
  //     });
  //     if (!newSourceData) throw new Error("No source found");
  //     const sortedSources = sortSources(newSourceData?.sources);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // todo: player settings
  // auto play
  // Auto Next

  // Add to list
  // - watching
  // - on-hold
  // - plan to watch
  // - dropped
  // - completed

  const player = useRef<MediaPlayerInstance>(null);

  const remote = useMediaRemote(player);

  function onLoadedData(nativeEvent: MediaLoadedDataEvent) {
    setTimeout(() => {
      remote.seek(timeBefore - 5, nativeEvent);
      setTimeBefore(0);
      remote.play(nativeEvent);
    }, 500);
  }

  useEffect(() => {
    return () => {
      console.log("removed");
    };
  }, []);

  return (
    <section className="overflow-hidden relative">
      <MediaPlayer
        streamType="on-demand"
        aspectRatio="16/9"
        load="visible"
        posterLoad="visible"
        title={title}
        src={episodeSource.url}
        ref={player}
        autoPlay={autoPlay}
        onAutoPlayChange={setAutoPlay}
        onLoadedData={onLoadedData}
        // onEnd={()}
      >
        <MediaProvider>
          {poster && <Poster className="vds-poster" src={poster} alt={title} />}
        </MediaProvider>
        <DefaultAudioLayout icons={defaultLayoutIcons} />

        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          // thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
          slots={{
            timeSlider: (
              <TimeSlider.Root
                defaultValue={timeBefore || 0}
                className="vds-time-slider vds-slider"
              >
                <TimeSlider.Track className="vds-slider-track" />
                <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track bg-primary-500" />
                <TimeSlider.Progress className="vds-slider-progress vds-slider-track bg-[#ffff89]" />
                <TimeSlider.Thumb className="vds-slider-thumb" />
              </TimeSlider.Root>
            ),

            beforeSettingsMenu: (
              <Menu.Root>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Menu.Button className="vds-button w-24 flex items-center  gap-1 mx-1">
                      {episodeSource.quality}
                      <Icons.chevronDown className="size-5" />
                    </Menu.Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="vds-tooltip-content"
                    placement="top start"
                  >
                    Quality
                  </Tooltip.Content>
                </Tooltip.Root>
                <Menu.Content className="vds-menu-items ">
                  <Menu.RadioGroup
                    className="vds-radio-group"
                    value={episodeSource.quality}
                  >
                    {sortedSources.map((quality) => (
                      <Menu.Radio
                        className="vds-radio"
                        value={quality.quality}
                        onSelect={() => {
                          setTimeBefore(player.current?.currentTime || 0);
                          setEpisodeSource(quality);
                        }}
                        key={quality.quality}
                      >
                        <span className="vds-radio-label">
                          {quality.quality}
                        </span>
                        <Icons.check className="vds-icon" />
                      </Menu.Radio>
                    ))}
                  </Menu.RadioGroup>
                </Menu.Content>
              </Menu.Root>
            ),
          }}
        />
      </MediaPlayer>
    </section>
  );
}

const sortSources = (sources: EpisodeSourceData["sources"]) => {
  if (!sources) return [];
  return sources.sort((a, b) => {
    return (
      sourcePriority.indexOf(a.quality) - sourcePriority.indexOf(b.quality)
    );
  });
};
