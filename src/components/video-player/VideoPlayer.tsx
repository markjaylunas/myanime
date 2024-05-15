"use client";

import { useRef } from "react";

import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  useStore,
  type MediaPlayerInstance as TMediaPlayerInstance,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

// import { textTracks } from "./tracks";

type Props = {
  source: string;
  title: string;
  posterSrc: string;
};

export default function VideoPlayer({ source, title, posterSrc }: Props) {
  let player = useRef<TMediaPlayerInstance>(null),
    {} = useStore(MediaPlayerInstance, player);

  // console.log({ duration });
  // console.log({ currentTime });

  // todo: player settings
  // auto play
  // Auto Next
  // quality
  // Add to list
  // - watching
  // - on-hold
  // - plan to watch
  // - dropped
  // - completed

  return (
    <section className="overflow-hidden">
      <MediaPlayer
        streamType="on-demand"
        aspectRatio="16/9"
        load="visible"
        posterLoad="visible"
        title={title}
        src={source}
        ref={player}

        // onEnd={()}
      >
        <MediaProvider>
          {posterSrc && (
            <Poster className="vds-poster" src={posterSrc} alt={title} />
          )}
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
    </section>
  );
}
