"use client";

import { AnimeInfo } from "@/lib/types";
import { Spacer } from "@nextui-org/spacer";
import NextImage from "next/image";

type Props = {
  title: AnimeInfo["title"];
  image: AnimeInfo["image"];
  cover: AnimeInfo["cover"];
};

export default function InfoHero({ title, image, cover }: Props) {
  const isCoverDuplicated = cover === image;

  const mainTitle = title.english || title.romaji || title.native || "";

  return (
    <section className="relative flex flex-col space-y-10">
      <div className=" relative w-full  h-[150px] md:h-[200px] lg:h-[300px]">
        <NextImage
          src={isCoverDuplicated || !cover ? "" : cover}
          alt={mainTitle}
          fill
          sizes="100vw"
          className="object-cover bg-gray-800 "
        />
        <div className="absolute z-20 inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <h1 className="absolute z-30 -bottom-7  text-3xl md:text-3xl lg:text-6xl pl-5 line-clamp-2 font-medium">
          {mainTitle}
        </h1>
      </div>
      <Spacer y={10} />
    </section>
  );
}
