import { fetchAnimeEpisodeSource, fetchAnimeInfo } from "@/actions/action";
import EpisodeList from "@/components/ui/EpisodeList";
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

  const episodeList = info?.episodes?.map((episode) => ({
    id: episode.id,
    episodeNumber: episode.number,
  }));

  const hasEpisode = info.totalEpisodes;
  console.log(info);

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

      <h1>Episode Page</h1>
      <p>animeId: {params.animeId}</p>
      <p>episodeId: {episodeId}</p>

      {episodeList && hasEpisode && (
        <EpisodeList animeId={animeId} episodeList={episodeList} />
      )}
    </>
  );
}
