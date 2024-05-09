import { Button } from "@nextui-org/button";
import NextLink from "next/link";

type Props = {
  animeId: string;
  episodeList: {
    id: string;
    episodeNumber: number;
  }[];
};

export default function Episodes({ animeId, episodeList }: Props) {
  return (
    <section>
      <ol>
        {episodeList.map((episode) => (
          <Button
            as={NextLink}
            href={`/watch/${animeId}/${episode.id}`}
            variant="flat"
            radius="md"
            key={episode.id}
            isIconOnly
          >
            {episode.episodeNumber}
          </Button>
        ))}
      </ol>
    </section>
  );
}
