"use client";

import { useInViewport } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { SourceProps } from "react-player/base";

function formatSecondsToTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedTime = [
    hrs > 0 ? (hrs < 10 ? "0" + hrs : hrs) : "00",
    mins > 0 ? (mins < 10 ? "0" + mins : mins) : "00",
    secs > 0 ? (secs < 10 ? "0" + secs : secs) : "00",
  ].join(":");

  return formattedTime;
}

type Props = {
  url: string | string[] | SourceProps[] | MediaStream;
} & ReactPlayerProps;

type Progress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

const Video = ({ url, ...props }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<Progress>({
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport) {
      setIsLoaded(true);

      if (isLoaded) {
        setIsPlaying(true);
      }
    } else if (!inViewport && isLoaded) {
      setIsPlaying(false);
    }
  }, [inViewport]);

  return (
    <div ref={ref}>
      <ul>
        <li>Played: {Math.floor(progress.played * 100)}%</li>
        <li>Played Seconds: {formatSecondsToTime(progress.playedSeconds)}</li>
        <li>Loaded: {Math.floor(progress.loaded * 100)}%</li>
        <li>Loaded Seconds: {formatSecondsToTime(progress.loadedSeconds)}</li>
      </ul>
      {inViewport || isLoaded ? (
        <ReactPlayer
          width="100%"
          height="100%"
          url={url}
          controls
          playing={isPlaying}
          onProgress={(progress) => setProgress(progress)}
          {...props}
        />
      ) : null}
    </div>
  );
};

export default Video;
