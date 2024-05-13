import { fetchAnimeEpisodeSource, fetchAnimeInfo } from "@/actions/action";
import NoVideo from "@/components/video-player/NoVideo";
import Video from "@/components/video-player/Video";
import { notFound } from "next/navigation";

export default async function EpisodePage({
  params,
}: {
  params: { animeId: string; episodeSlug: string[] };
}) {
  const { episodeSlug, animeId } = params;
  const [episodeId, episodeNumber] = episodeSlug;

  const [info, animeEpisodeSource] = await Promise.all([
    await fetchAnimeInfo({ animeId }),
    await fetchAnimeEpisodeSource({ episodeId }),
  ]);

  if (!info) {
    return notFound();
  }

  const hasEpisode = info.totalEpisodes;

  return (
    <>
      {hasEpisode && animeEpisodeSource && info ? (
        <Video
          episodeSource={animeEpisodeSource}
          info={info}
          episodeId={episodeId}
          episodeNumber={episodeNumber}
        />
      ) : (
        <NoVideo bgSrc={info.image} title={`${info.status}`} />
      )}
    </>
  );
}
