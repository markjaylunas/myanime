import { fetchAnimeEpisodeSource } from "@/actions/action";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default async function EpisodePage({
  params,
}: {
  params: { animeId: string; episodeId: string };
}) {
  const { episodeId } = params;
  // todo: refactor to catch all params in watch page only
  const animeEpisodeSource = await fetchAnimeEpisodeSource({ episodeId });

  const source =
    animeEpisodeSource?.sources[3] ||
    animeEpisodeSource?.sources[2] ||
    animeEpisodeSource?.sources[1] ||
    animeEpisodeSource?.sources[0] ||
    animeEpisodeSource?.sources[4];

  return (
    <div>
      <h1>Episode Page</h1>
      <p>animeId: {params.animeId}</p>
      <p>episodeId: {params.episodeId}</p>

      {source ? <VideoPlayer url={source.url} /> : <p>Video not found</p>}
    </div>
  );
}
