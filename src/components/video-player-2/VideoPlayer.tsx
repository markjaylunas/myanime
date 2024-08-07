"use client";

import { useEffect, useRef, useState } from "react";

import {
  MediaLoadedDataEvent,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  TimeSlider,
  ToggleButton,
  Track,
  useMediaRemote,
} from "@vidstack/react";

import {
  upsertEpisodeProgress,
  UpsertEpisodeProgressData,
} from "@/actions/action";
import { EpisodeProgress } from "@/db/schema";
import { TrackSchema } from "@/lib/aniwatch-validations";
import { cn } from "@/lib/utils";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useParams, usePathname, useRouter } from "next/navigation";

type Props = {
  animeTitle: string;
  animeImage: string;
  animeCover?: string;
  episodeTitle: string | null;
  episodeImage?: string;
  episodeSource: { url: string; type: string; quality?: string }[] | null;
  nextEpisode: { episodeId: string; episodeNumber: number } | null;
  episodeProgress: EpisodeProgress | null;
  userId: string | null;
  trackListList: TrackSchema[] | [];
};

export default function VideoPlayer({
  animeTitle,
  animeImage,
  animeCover,
  episodeImage,
  episodeTitle,
  episodeSource,
  nextEpisode,
  episodeProgress,
  userId,
  trackListList,
}: Props) {
  const { episodeSlug, animeId } = useParams<{
    animeId: string;
    episodeSlug: string[];
  }>();
  const router = useRouter();
  const pathname = usePathname();
  const [episodeId, episodeNumber] = episodeSlug;
  const captions = trackListList.filter(
    (caption) => caption.kind == "captions"
  );
  const thumbnails = trackListList.filter(
    (caption) => caption.kind == "thumbnails"
  );

  const [canNext, setCanNext] = useState(false);
  const initialTime =
    episodeProgress?.episodeId === episodeId ? episodeProgress?.currentTime : 0;
  const [timeBefore, setTimeBefore] = useState<number>(initialTime);
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
      // if(initialTime) toast("Resuming from where you left off");
      remote.seek(timeBefore - 5, nativeEvent);
      setTimeBefore(0);
      remote.play(nativeEvent);
    }, 500);
  }

  useEffect(() => {
    return () => {
      const currentTime = player.current?.currentTime || 0;
      const durationTime = player.current?.duration || 0;

      if (currentTime && userId && currentTime > 30) {
        let data: UpsertEpisodeProgressData = {
          anime: {
            id: animeId,
            title: animeTitle,
            image: animeImage,
            cover: animeCover || "",
          },
          episode: {
            id: episodeId,
            animeId,
            number: Number(episodeNumber),
            title: episodeTitle,
            image: episodeImage,
            durationTime,
          },
          episodeProgress: {
            id: episodeProgress?.id,
            userId,
            animeId,
            episodeId,
            currentTime,
            isFinished: currentTime / durationTime > 0.9,
          },
        };

        upsertEpisodeProgress({ data, pathname });
      }

      player.current!.subscribe(({ duration, currentTime }) => {
        if (currentTime / duration > 0.9 && !canNext) setCanNext(true);
      });
    };
  }, []);

  const poster = thumbnails[0]?.file || episodeImage || animeImage;
  return (
    <section className="overflow-hidden relative">
      <MediaPlayer
        streamType="on-demand"
        aspectRatio="16/9"
        load="eager"
        posterLoad="visible"
        title={episodeTitle || animeTitle}
        ref={player}
        src={episodeSource ? episodeSource[0].url : undefined}
        autoPlay={autoPlay}
        onAutoPlayChange={setAutoPlay}
        onLoadedData={onLoadedData}
        onEnd={() =>
          nextEpisode
            ? router.push(
                `/info/${animeId}/watch/${nextEpisode.episodeId}/${nextEpisode.episodeNumber}`
              )
            : null
        }
        playsInline
        crossOrigin
        viewType="video"
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src={poster}
            alt={episodeTitle || animeTitle}
          />
          {captions.map((caption, captionIdx) => (
            <Track
              key={`${captionIdx}`}
              src={caption.file}
              label={caption.label || ""}
              kind={caption?.kind as TextTrackKind}
              language="en-us"
              type={"vtt"}
              default={Boolean(caption.default)}
            />
          ))}
        </MediaProvider>

        <DefaultAudioLayout icons={defaultLayoutIcons} />

        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          thumbnails={thumbnails[0].file}
          slots={{
            beforeFullscreenButton: nextEpisode ? (
              <ToggleButton
                onClick={() =>
                  router.push(
                    `/info/${animeId}/watch/${nextEpisode.episodeId}/${nextEpisode.episodeNumber}`
                  )
                }
                className={cn(
                  "vds-button w-16",
                  canNext ? "visible" : "hidden"
                )}
              >
                Next
              </ToggleButton>
            ) : null,

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
          }}
        />
      </MediaPlayer>
    </section>
  );
}
