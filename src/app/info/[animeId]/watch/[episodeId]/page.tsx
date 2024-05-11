import { fetchAnimeEpisodeSource, fetchAnimeInfo } from "@/actions/action";
import EpisodeList from "@/components/ui/EpisodeList";
import Video from "@/components/video-player/Video";

export default async function EpisodePage({
  params,
}: {
  params: { animeId: string; episodeId: string };
}) {
  const { episodeId, animeId } = params;
  // todo: refactor to catch all params in watch page only

  const [info, animeEpisodeSource] = await Promise.all([
    await fetchAnimeInfo({ animeId }),
    await fetchAnimeEpisodeSource({ episodeId }),
  ]);

  const episodeList = info?.episodes?.map((episode) => ({
    id: episode.id,
    episodeNumber: episode.number,
  }));

  return (
    <>
      {animeEpisodeSource && info ? (
        <Video
          episodeSource={animeEpisodeSource}
          info={info}
          episodeId={episodeId}
        />
      ) : (
        <div className="w-full aspect-video">Loading...</div>
      )}
      <h1>Episode Page</h1>
      <p>animeId: {params.animeId}</p>
      <p>episodeId: {params.episodeId}</p>

      {episodeList && (
        <EpisodeList animeId={animeId} episodeList={episodeList} />
      )}
    </>
  );
}
