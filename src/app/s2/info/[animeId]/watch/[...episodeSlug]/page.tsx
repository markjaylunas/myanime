import { fetchEpisodeProgress } from "@/actions/action";
import {
  fetchAWAnimeData,
  fetchAWEpisodeData,
  fetchAWEpisodeSourceData,
} from "@/actions/aniwatch";
import { auth } from "@/auth";
import NoVideo from "@/components/video-player-2/NoVideo";
import VideoPlayer from "@/components/video-player-2/VideoPlayer";
import { decodeEpisodeId } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EpisodePage({
  params,
}: {
  params: { animeId: string; episodeSlug: string[] };
}) {
  const { episodeSlug, animeId } = params;
  const [episodeId] = episodeSlug;
  console.log(episodeId);

  const session = await auth();
  const userId = session?.user?.id;
  const episodeProgressData = userId
    ? await fetchEpisodeProgress({
        userId,
        animeId,
        episodeId,
      })
    : null;

  const episodeProgress = episodeProgressData ? episodeProgressData[0] : null;

  const [infoData, episodeData, episodeSourceData] = await Promise.all([
    fetchAWAnimeData({ animeId }),
    fetchAWEpisodeData({ animeId }),
    fetchAWEpisodeSourceData({ episodeId }),
  ]);

  if (!infoData) {
    return notFound();
  }

  const { anime } = infoData;
  const { info } = anime;

  const episodeIndex = episodeData
    ? episodeData.episodes.findIndex(
        (episode) => decodeEpisodeId(episode.episodeId) === episodeId
      )
    : 1;

  const episode = episodeData ? episodeData.episodes[episodeIndex] : null;

  const nextEpisode = episodeData
    ? episodeData.episodes[(episodeIndex || 0) + 1]
    : null;
  const episodeTitle = episode?.title;
  return (
    <>
      {episodeSourceData ? (
        <VideoPlayer
          animeTitle={info.name}
          episodeTitle={episodeTitle || null}
          animeImage={info.poster}
          episodeSource={episodeSourceData.sources}
          nextEpisode={
            nextEpisode
              ? {
                  episodeId: nextEpisode?.episodeId,
                  episodeNumber: nextEpisode?.number,
                }
              : null
          }
          episodeProgress={episodeProgress}
          userId={userId || null}
          trackListList={episodeSourceData.tracks || []}
        />
      ) : (
        <NoVideo bgSrc={info.poster} title={`No source found`} />
      )}
    </>
  );
}
