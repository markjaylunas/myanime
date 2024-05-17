import {
  fetchAnimeData,
  fetchAnimeEpisodeSource,
  fetchEpisodeData,
} from "@/actions/meta";
import NoVideo from "@/components/video-player/NoVideo";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { createClient } from "@/lib/supabase/server";
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

  const supabase = createClient()

  const { data: {user} } = await supabase.auth.getUser()

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
          user={user}
        />
      ) : (
        <NoVideo bgSrc={info.image} title={`${info.status}`} />
      )}
    </>
  );
}
