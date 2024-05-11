"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import NextLink from "next/link";
import { useState } from "react";

type Props = {
  animeId: string;
  episodeList: {
    id: string;
    episodeNumber: number;
  }[];
};

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export default function EpisodeList({ animeId, episodeList }: Props) {
  const chunkSize = episodeList.length > 200 ? 100 : 25;
  const episodeChunks = chunkArray(episodeList, chunkSize);
  const tabIndex = Array.from({ length: episodeChunks.length }, (_, i) => i);

  const [selected, setSelected] = useState<string | number>(tabIndex[0]);

  return (
    <section className="flex w-full flex-col">
      <Tabs
        selectedKey={selected}
        aria-label="Episode List"
        onSelectionChange={setSelected}
        color="primary"
        variant="underlined"
      >
        {episodeChunks.map((chunk, index) => (
          <Tab
            key={index}
            title={
              <>
                {index === 0 && <span className="mr-2">Episode</span>}
                {index * chunkSize + 1}-
                {Math.min((index + 1) * chunkSize, episodeList.length)}
              </>
            }
          >
            <Card>
              <CardBody>
                <div className="flex flex-wrap justify-start gap-2 mx-auto">
                  {chunk.map((episode) => (
                    <Button
                      as={NextLink}
                      href={`/info/${animeId}/watch/${episode.id}`}
                      variant="shadow"
                      radius="md"
                      color="primary"
                      key={episode.id}
                      isIconOnly
                    >
                      {episode.episodeNumber}
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </section>
  );
}
