import {
  fetchAnimeData,
  fetchAnimeEpisodeSource,
  fetchEpisodeData,
} from "@/actions/meta";
import NoVideo from "@/components/video-player/NoVideo";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { pickTitle } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EpisodePage({
  params,
}: {
  params: { animeId: string; episodeSlug: string[] };
}) {
  const { episodeSlug, animeId } = params;

  const [episodeId] = episodeSlug;

  const [info, animeEpisodeSource, episodeData] = await Promise.all([
    fetchAnimeData({ animeId }),
    fetchAnimeEpisodeSource({ episodeId }),
    fetchEpisodeData({ animeId, provider: "gogoanime" }),
  ]);

  if (!info) {
    return notFound();
  }

  const episode = episodeData?.find((episode) => episode.id === episodeId);
  const title = episode
    ? `Ep ${episode?.number} - ${episode?.title} - ${new Date(
        `${episode.createdAt}`
      ).toLocaleDateString()}`
    : pickTitle(info.title);

  return (
    <>
      {animeEpisodeSource ? (
        <VideoPlayer
          title={title}
          poster={episode?.image || info.image}
          episodeSource={animeEpisodeSource}
        />
      ) : (
        <NoVideo bgSrc={info.image} title={`${info.status}`} />
      )}
    </>
  );
}
