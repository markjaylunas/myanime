"use client";

import MyImage from "@/components/ui/MyImage";
import { AnimeInfo } from "@/lib/types";

type Props = {
  info: AnimeInfo;
};

export default function InfoAbout({ info }: Props) {
  const title =
    info.title.english || info.title.romaji || info.title.native || info.id;
  return (
    <section>
      <MyImage src={info.image} alt={title} width="100" height="100" />

      <h1>{title}</h1>
      <p>{info.description}</p>

      <pre className="max-w-2xl overflow-scroll">
        {JSON.stringify(info, null, 2)}
      </pre>
    </section>
  );
}
