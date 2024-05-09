import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";
export type AnimeCardProps = {
  id: string;
  title: string;
  image: string;

  url?: string;
  releaseDate?: string;
  subOrDub?: string;
};

export default function AnimeCard(props: AnimeCardProps) {
  const href = `/info/${props.id}`;
  return (
    <Card className="relative h-[200px] sm:h-[250px] md:h-[300px] aspect-2/3 bg-transparent select-none hover:cursor-pointer overflow-hidden">
      <CardHeader className="absolute z-20 top-0 p-4 flex justify-end items-start">
        {props.subOrDub === "dub" && (
          <Chip radius="sm" color="secondary">
            DUB
          </Chip>
        )}
      </CardHeader>
      <div className="absolute z-10 w-full h-full bg-gradient-to-t from-black/80  via-black/20 to-transparent" />
      <Image
        removeWrapper
        alt={props.title}
        className="z-0 w-full h-full object-cover"
        src={props.image}
      />
      <CardFooter className="absolute z-20 bottom-0 p-4 flex justify-center items-start">
        <Link href={href}>
          <h4 className="text-white font-bold text-xs md:text-lg line-clamp-3 text-center text-pretty">
            {props.title}
          </h4>
        </Link>
        <section></section>
      </CardFooter>
    </Card>
  );
}
