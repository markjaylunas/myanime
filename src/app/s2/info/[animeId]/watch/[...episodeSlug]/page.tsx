import { fetchEpisodeProgress } from "@/actions/action";
import {
  fetchAWAnimeData,
  fetchAWEpisodeData,
  fetchAWEpisodeServersData,
  fetchAWEpisodeSourceData,
} from "@/actions/aniwatch";
import { auth } from "@/auth";
import NoVideo from "@/components/video-player-2/NoVideo";
import { ServerOptionListType } from "@/components/video-player-2/server-option-list";
import VideoPlayer from "@/components/video-player-2/VideoPlayer";
import { decodeEpisodeId, encodeEpisodeId } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

export default async function EpisodePage({
  params,
  searchParams,
}: {
  params: { animeId: string; episodeSlug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { episodeSlug, animeId } = params;
  const [episodeId] = episodeSlug;
  const decodedEpisodeId = decodeEpisodeId(episodeId);

  const category =
    typeof searchParams?.category === "string"
      ? searchParams?.category || ""
      : "";
  const server =
    typeof searchParams?.server === "string" ? searchParams?.server || "" : "";

  const session = await auth();
  const userId = session?.user?.id;

  const [infoData, episodeData, episodeSourceData, episodeServersData] =
    await Promise.all([
      fetchAWAnimeData({ animeId }),
      fetchAWEpisodeData({ animeId }),
      fetchAWEpisodeSourceData({
        episodeId: decodedEpisodeId,
        category,
        server,
      }),
      fetchAWEpisodeServersData({ episodeId: decodedEpisodeId }),
    ]);

  if (!infoData) {
    return notFound();
  }
  if (!episodeSourceData) {
    const serverListOption: ServerOptionListType = [
      { type: "sub", list: episodeServersData?.sub || [] },
      { type: "dub", list: episodeServersData?.dub || [] },
      { type: "raw", list: episodeServersData?.raw || [] },
    ];

    const serverListFiltered = serverListOption.filter(
      (server) => server.list.length > 0
    );

    console.log({ serverListFiltered });
    if (serverListFiltered) {
      redirect(
        `/s2/info/${animeId}/watch/${encodeEpisodeId(
          episodeServersData?.episodeId || ""
        )}/${episodeServersData?.episodeNo || 1}?category=${
          serverListFiltered[0].type
        }&server=${serverListFiltered[0].list[0].serverName}`
      );
    }
  }

  const { anime } = infoData;
  const { info } = anime;

  const episodeIndex = episodeData
    ? episodeData.episodes.findIndex(
        (episode) => episode.episodeId === decodedEpisodeId
      )
    : 1;

  const episode = episodeData ? episodeData.episodes[episodeIndex] : null;

  const episodeProgressData = userId
    ? await fetchEpisodeProgress({
        userId,
        animeId: info.malId,
        episodeId: `${info.malId}-${episode?.number}`,
      })
    : null;

  const episodeProgress = episodeProgressData ? episodeProgressData[0] : null;

  const nextEpisode = episodeData
    ? episodeData.episodes[(episodeIndex || 0) + 1]
    : null;
  const episodeTitle = episode?.title;

  return (
    <>
      {episodeSourceData && episode ? (
        <VideoPlayer
          animeId={info.malId}
          episodeId={`${info.malId}-${episode?.number}`}
          episodeNumber={episode.number}
          server="s2"
          serverAnimeId={animeId}
          serverEpisodeId={episodeId}
          animeTitle={info.name}
          episodeTitle={episodeTitle || null}
          animeImage={info.poster}
          episodeSource={episodeSourceData.sources}
          nextEpisode={
            nextEpisode
              ? {
                  episodeId: nextEpisode?.episodeId,
                  episodeNumber: nextEpisode?.number,
                }
              : null
          }
          episodeProgress={episodeProgress}
          userId={userId || null}
          trackListList={episodeSourceData.tracks || []}
        />
      ) : (
        <NoVideo
          bgSrc={info.poster}
          title={`No source found`}
          description="Please try other stream servers below ⬇️"
        />
      )}
    </>
  );
}
