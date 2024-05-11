"use client";

import { useEffect, useRef, useState } from "react";

import { AnimeInfo, EpisodeSource } from "@/lib/types";
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

// import { textTracks } from "./tracks";

type Props = {
  episodeSource: EpisodeSource;
  info: AnimeInfo;
  episodeId: string;
  episodeNumber: string;
};

const sourcePriority = ["1080p", "720p", "480p", "360p", "default", "backup"];

export default function Video({
  episodeSource,
  info,
  episodeId,
  episodeNumber,
}: Props) {
  const about = `Episode ${episodeNumber || 1} - ${info.title}`;
  const sortedSources = episodeSource.sources.sort((a, b) => {
    return (
      sourcePriority.indexOf(a.quality) - sourcePriority.indexOf(b.quality)
    );
  });

  const defaultSource = sortedSources[0];

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

      <div className="">
        {episodeSource.sources.map((source) => (
          <button key={source.url} onClick={() => setSrc(source.url)}>
            {source.quality}
          </button>
        ))}
      </div>
    </section>
  );
}
