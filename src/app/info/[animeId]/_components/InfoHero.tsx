"use client";

import NextImage from "next/image";

type Props = {
  title: string;
  image: string;
  cover: string;
};

export default function InfoHero({ title, image, cover }: Props) {
  const isCoverDuplicated = cover === image;
  return (
    <section className="relative flex flex-col space-y-10">
      <div className=" relative w-full  h-[150px] md:h-[200px] lg:h-[300px]">
        <NextImage
          src={isCoverDuplicated || !cover ? "" : cover || ""}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover bg-gray-200 dark:bg-gray-800 "
          unoptimized
        />
        <h1 className="absolute z-30 bottom-2 text-white  text-3xl md:text-5xl lg:text-6xl pl-5 line-clamp-2 font-medium">
          {title}
        </h1>
      </div>
      <div className="absolute z-20  inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </section>
  );
}
