import { AnimeDataSchema } from "@/lib/meta-validations";
import { pickTitle, stringToSlug } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import ExpandDescription from "./ExpandDescription";

type Props = {
  info: AnimeDataSchema;
};

export default function AnimeInfoSection({ info }: Props) {
  const title = pickTitle(info.title);
  return (
    <Card isBlurred className="border-none " shadow="sm" fullWidth>
      <CardBody>
        <div className="flex flex-col items-start sm:flex-row gap-8 p-0 md:p-4">
          <div className="relative col-span-6 md:col-span-4 md:max-w-[300px] lg:max-w-[350px] min-w-[200px] sm:w-full">
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
                <h1 className="text-3xl font-medium  text-primary">{title}</h1>
                <h2 className="text-xs text-gray-400">
                  {info.synonyms.join(" ")}
                </h2>

                <div className="flex flex-col mt-4 gap-2">
                  <Chip color="secondary" variant="faded">
                    Status | &nbsp;
                    <span className="font-semibold text-foreground/90">
                      {info.status}
                    </span>
                  </Chip>

                  <Chip color="secondary" variant="faded">
                    Total Episodes | &nbsp;
                    <span className="font-semibold text-foreground/90">
                      {info.totalEpisodes}
                    </span>
                  </Chip>

                  {/* <Chip color="secondary" variant="faded">
                    Sub or Dub | &nbsp;
                    <span className="font-semibold text-foreground/90">
                      {info.subOrDub?.toUpperCase()}
                    </span>
                  </Chip> */}

                  <Chip color="secondary" variant="faded">
                    Released | &nbsp;
                    <span className="font-semibold text-foreground/90">
                      {info.releaseDate}
                    </span>
                  </Chip>

                  <Chip color="secondary" variant="faded">
                    Type | &nbsp;
                    <span className="font-semibold text-foreground/90">
                      {info.type}
                    </span>
                  </Chip>

                  {info.genres && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {info.genres.map((genre) => (
                        <Button
                          as={NextLink}
                          href={`/genre/${stringToSlug(genre)}`}
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
