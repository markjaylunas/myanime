"use client";

import { Button } from "@nextui-org/button";
import NextLink from "next/link";

type Props = {
  genreList: string[];
};

export default function GenreListContainer({ genreList }: Props) {
  return (
    <section className="flex flex-wrap gap-3 via-">
      {genreList.map((genre) => (
        <Button
          as={NextLink}
          radius="full"
          size="sm"
          variant="shadow"
          href={`/s1/genre?genres=[${genre}]`}
          className="bg-gradient-to-br from-indigo-800 to-cyan-500 border-small border-white/50 shadow-cyan-500/30 drop-shadow  text-white"
          key={genre}
        >
          {genre}
        </Button>
      ))}
    </section>
  );
}
