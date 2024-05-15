import { fetchAnimeEpisodeSource, fetchAnimeInfo } from "@/actions/action";
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

  const [info, animeEpisodeSource] = await Promise.all([
    await fetchAnimeInfo({ animeId }),
    await fetchAnimeEpisodeSource({ episodeId }),
  ]);

  if (!info) {
    return notFound();
  }

  return (
    <>
      {animeEpisodeSource ? (
        <VideoPlayer info={info} episodeSource={animeEpisodeSource} />
      ) : (
        <NoVideo bgSrc={info.image} title={`${info.status}`} />
      )}
    </>
  );
}
