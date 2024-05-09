"use client";

import { EpisodeSource } from "@/lib/types";
import { useInViewport } from "@mantine/hooks";
import { Select, SelectItem } from "@nextui-org/select";
import React, { useEffect, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";

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
  episodeSource: EpisodeSource;
} & ReactPlayerProps;

type Progress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};

export default function VideoPlayer({ episodeSource, ...props }: Props) {
  const defaultSource = episodeSource.sources.find(
    (source) => source.quality === "360p"
  );

  const [source, setSource] = React.useState<string>(defaultSource?.url || "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<Progress>({
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inViewport } = useInViewport();

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSource(event.target.value);
  };

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

      <SelectSource
        source={source}
        onChange={handleSelectionChange}
        sourceList={episodeSource.sources}
      />

      {inViewport || isLoaded ? (
        <ReactPlayer
          width="100%"
          height="100%"
          url={source}
          controls
          playing={isPlaying}
          onProgress={(progress) => setProgress(progress)}
          {...props}
        />
      ) : null}
    </div>
  );
}

function SelectSource({
  source,
  sourceList,
  onChange,
}: {
  source: string;
  sourceList: EpisodeSource["sources"];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <Select
      placeholder="Default video source"
      className="max-w-xs"
      value={source}
      onChange={onChange}
    >
      {sourceList.map((item) => (
        <SelectItem key={item.url} value={item.url}>
          {item.quality}
        </SelectItem>
      ))}
    </Select>
  );
}
