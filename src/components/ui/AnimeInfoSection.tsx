import { AnimeDataSchema } from "@/lib/meta-validations";
import { pickTitle } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import { ReactNode } from "react";
import ExpandDescription from "./ExpandDescription";

type Props = {
  info: AnimeDataSchema;
};

export default function AnimeInfoSection({ info }: Props) {
  const title = pickTitle(info.title);
  return (
    <Card isBlurred className="border-none " shadow="sm" fullWidth>
      <CardBody>
        <div className="flex flex-col-reverse items-start sm:flex-row gap-8 p-0 md:p-4">
          <div className="relative col-span-6 md:col-span-4 md:max-w-[300px] lg:max-w-[350px] min-w-[200px] sm:w-full mx-auto">
            <Image
              alt={title}
              src={info.image}
              className="object-cover"
              height={200}
              shadow="md"
              width="100%"
              isZoomed
            />
          </div>

          <div className="flex-grow flex flex-col col-span-6 md:col-span-8">
            <div className="flex flex-col justify-between items-start">
              <div className="flex flex-col gap-0">
                <h1 className="sr-only text-3xl font-medium  text-primary">
                  {title}
                </h1>
                <h2 className="text-xs text-gray-400">
                  {Object.values(info.title).filter(Boolean).join(" | ")}
                </h2>
                <div className="flex flex-col mt-4 gap-2">
                  <div className="flex flex-wrap max-w-md gap-2 mt-4">
                    <DetailChip label="Status">{info.status}</DetailChip>

                    <DetailChip label="Total Episodes">
                      {info.totalEpisodes}
                    </DetailChip>

                    <DetailChip label="Released">{info.releaseDate}</DetailChip>

                    <DetailChip label="Type">{info.type}</DetailChip>

                    <DetailChip label="Studios">
                      {info.studios.join(" , ")}
                    </DetailChip>

                    <DetailChip label="Season">{info.season}</DetailChip>

                    <DetailChip label="Rating">{info.rating}</DetailChip>

                    <DetailChip label="Popularity">
                      {info.popularity}
                    </DetailChip>
                  </div>

                  {info.genres && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {info.genres.map((genre) => (
                        <Button
                          as={NextLink}
                          href={`/genre?genres=[${genre}]`}
                          key={genre}
                          color="secondary"
                          variant="shadow"
                          radius="full"
                          size="sm"
                        >
                          {genre}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <ExpandDescription
                className="mt-4"
                description={`${info.description}`}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const DetailChip = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => (
  <Chip color="secondary" variant="faded">
    {label} | &nbsp;
    <span className="font-semibold text-foreground/90">{children}</span>
  </Chip>
);
