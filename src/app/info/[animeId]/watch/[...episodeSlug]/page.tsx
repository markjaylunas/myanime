import { fetchEpisodeProgress } from "@/actions/action";
import {
  fetchAnimeData,
  fetchAnimeEpisodeSource,
  fetchEpisodeData,
} from "@/actions/meta";
import { auth } from "@/auth";
import NoVideo from "@/components/video-player/NoVideo";
import VideoPlayer from "@/components/video-player/VideoPlayer";
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
  const episodeProgressData = userId
    ? await fetchEpisodeProgress({
        userId,
        animeId,
        episodeId,
      })
    : null;

  const episodeProgress = episodeProgressData ? episodeProgressData[0] : null;

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

  const nextEpisode = episodeData ? episodeData[(episodeIndex || 0) + 1] : null;

  const title = `Ep ${episode?.number}${
    episode?.title ? ` - ${episode?.title}` : ""
  }`;

  return (
    <>
      {animeEpisodeSource ? (
        <VideoPlayer
          title={title}
          poster={episode?.image || info.image}
          episodeSource={animeEpisodeSource}
          nextEpisode={nextEpisode || null}
          episodeProgress={episodeProgress}
          userId={userId || null}
        />
      ) : (
        <NoVideo bgSrc={info.image} title={`${info.status}`} />
      )}
    </>
  );
}
