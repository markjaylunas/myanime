import { fetchEpisodeProgress } from "@/actions/action";
import {
  fetchAnimeData,
  fetchAnimeEpisodeSource,
  fetchEpisodeData,
} from "@/actions/meta";
import { auth } from "@/auth";
import VideoPlayer from "@/components/video-player-2/VideoPlayer";
import NoVideo from "@/components/video-player/NoVideo";
import { pickTitle } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EpisodePage({
  params,
}: {
  params: { animeId: string; episodeSlug: string[] };
}) {
  const { episodeSlug, animeId } = params;
  const [episodeId] = episodeSlug;

  const session = await auth();
  const userId = session?.user?.id;

  const [info, animeEpisodeSource, episodeData] = await Promise.all([
    fetchAnimeData({ animeId }),
    fetchAnimeEpisodeSource({ episodeId }),
    fetchEpisodeData({ animeId, provider: "gogoanime" }),
  ]);

  if (!info) {
    return notFound();
  }

  const episodeIndex = episodeData
    ? episodeData.findIndex((episode) => episode.id === episodeId)
    : 1;
  const episode = episodeData ? episodeData[episodeIndex] : null;

  const episodeProgressData = userId
    ? await fetchEpisodeProgress({
        userId,
        animeId,
        episodeId: `${animeId}-${episode?.number}`,
      })
    : null;

  const episodeProgress = episodeProgressData ? episodeProgressData[0] : null;
  console.log({ episodeProgress });

  const nextEpisode = episodeData ? episodeData[(episodeIndex || 0) + 1] : null;
  const episodeTitle = episode?.title || null;

  return (
    <>
      {animeEpisodeSource && episode ? (
        <VideoPlayer
          animeId={animeId}
          episodeId={`${animeId}-${episode?.number}`}
          episodeNumber={episode.number}
          server="s1"
          serverAnimeId={animeId}
          serverEpisodeId={episodeId}
          animeTitle={pickTitle(info.title)}
          episodeTitle={episodeTitle}
          animeImage={info.image}
          animeCover={info.cover || ""}
          episodeImage={episode?.image || ""}
          episodeSource={
            animeEpisodeSource.sources?.map((source) => ({
              url: source.url,
              type: source.isM3U8 ? "m3u8" : "",
              quality: source.quality,
            })) || []
          }
          nextEpisode={
            nextEpisode
              ? {
                  episodeId: nextEpisode?.id,
                  episodeNumber: nextEpisode?.number,
                }
              : null
          }
          episodeProgress={episodeProgress}
          userId={userId || null}
          trackListList={[]}
        />
      ) : (
        <NoVideo bgSrc={info.image} title={`${info.status}`} />
      )}
    </>
  );
}
