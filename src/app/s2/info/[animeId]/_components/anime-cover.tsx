"use client";

import NextImage from "next/image";

type Props = {
  title: string;
  image: string;
};

export default function AnimeCover({ title, image }: Props) {
  return (
    <section className="relative  flex-col ">
      <div className="relative w-full  h-[150px] md:h-[200px] lg:h-[300px]">
        <NextImage
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="-z-30 object-cover bg-gray-200 dark:bg-gray-800 "
          unoptimized
        />
      </div>
      <div className="absolute -z-30 backdrop-blur-md inset-0 bg-gradient-to-tr from-white dark:from-black to-transparent" />
      <div className="absolute -z-30 backdrop-blur-md inset-0 bg-gradient-to-t from-white dark:from-black to-transparent" />
    </section>
  );
}
