import { fetchAnimeEpisodeSource, fetchAnimeInfo } from "@/actions/action";
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

  return (
    <>
      <Video
        info={info}
        episodeNumber={parseInt(episodeNumber) || 1}
        episodeSource={animeEpisodeSource || null}
      />
    </>
  );
}
