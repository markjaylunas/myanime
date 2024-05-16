import { fetchAnimeData, fetchAnimeEpisodeSource } from "@/actions/meta";
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

  const [info, animeEpisodeSource] = await Promise.all([
    fetchAnimeData({ animeId }),
    fetchAnimeEpisodeSource({ episodeId }),
  ]);

  if (!info) {
    return notFound();
  }

  const title = pickTitle(info.title);

  return (
    <>
      {animeEpisodeSource ? (
        <VideoPlayer
          title={title}
          poster={info.cover || info.image}
          episodeSource={animeEpisodeSource}
        />
      ) : (
        <NoVideo bgSrc={info.image} title={`${info.status}`} />
      )}
    </>
  );
}
