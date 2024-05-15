"use client";

import { sourcePriority } from "@/lib/constants";
import { AnimeInfo, EpisodeSourceData } from "@/lib/types";
import { useState } from "react";
import NoVideo from "./NoVideo";
import VideoControl from "./VideoControl";
import VideoPlayer from "./VideoPlayer";

type Props = {
  info: AnimeInfo;
  episodeSource: EpisodeSourceData | null;
  episodeNumber: number;
};

export default function Video({ episodeSource, episodeNumber, info }: Props) {
  const title = `Episode ${episodeNumber} - ${info.title}`;

  const sortedSources = episodeSource?.sources
    ? episodeSource.sources.sort((a, b) => {
        return (
          sourcePriority.indexOf(a.quality) - sourcePriority.indexOf(b.quality)
        );
      })
    : [];

  const defaultSource = sortedSources[0];
  const hasEpisode = info.totalEpisodes;

  const [selectedSource, setSelectedSource] = useState(defaultSource);

  return (
    <>
      {hasEpisode && episodeSource && info ? (
        <VideoPlayer
          title={title}
          source={selectedSource.url}
          posterSrc={info.image}
        />
      ) : (
        <NoVideo bgSrc={info.image} title={`${info.status}`} />
      )}

      {sortedSources.length > 0 && (
        <VideoControl
          sourceList={sortedSources}
          info={info}
          episodeNumber={episodeNumber}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
        />
      )}
    </>
  );
}
