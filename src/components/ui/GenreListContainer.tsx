"use client";

import { GenreList } from "@/lib/types";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";

type Props = {
  genreList: GenreList;
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
          href={`/genre/${genre.id}`}
          className="bg-gradient-to-br from-indigo-800 to-cyan-500 border-small border-white/50 shadow-cyan-500/30 drop-shadow  text-white"
          // content: "drop-shadow shadow-black text-white",

          key={genre.id}
        >
          {genre.title}
        </Button>
      ))}
    </section>
  );
}
