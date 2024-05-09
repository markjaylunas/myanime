import { AnimeInfo } from "@/lib/types";
import { Button } from "@nextui-org/button";
import Link from "next/link";

type Props = {
  episodes: AnimeInfo["episodes"];
};

export default function InfoEpisodes({ episodes }: Props) {
  return (
    <section>
      <h2>Episodes</h2>
      <ol className="flex gap-1">
        {episodes.map((episode, index) => (
          <li key={index}>
            <Button
              as={Link}
              href={`/watch/${episode.id}`}
              isIconOnly
              variant="flat"
              radius="sm"
            >
              {episode.number}
            </Button>
          </li>
        ))}
      </ol>
    </section>
  );
}
