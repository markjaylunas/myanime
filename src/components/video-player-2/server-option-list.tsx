"use client";

import { AWEpisodeServersSchema } from "@/lib/aniwatch-validations";
import { cn, encodeEpisodeId } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Icons } from "../ui/Icons";
import Text from "../ui/Text";

export type ServerOptionListType = {
  type: string;
  list: AWEpisodeServersSchema[];
}[];

type Props = {
  serverList: ServerOptionListType;
  animeId: string;
  episodeId: string;
  episodeNumber: number;
  className?: string;
};

export default function ServerOptionList({
  serverList,
  animeId,
  episodeId,
  episodeNumber,
  className,
}: Props) {
  const currentServer = "s2";
  return (
    <section className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-3 flex-wrap">
        <Text className="text-secondary-500">Servers: </Text>
        {serverList.map((server) => (
          <Dropdown placement="bottom-start" key={server.type}>
            <DropdownTrigger>
              <Button
                size="sm"
                variant="flat"
                endContent={<Icons.chevronDown />}
              >
                {server.type.toUpperCase()}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Raw server options"
              className="max-w-[300px]"
            >
              {server.list.map((stream) => (
                <DropdownItem
                  href={`/${currentServer}/info/${animeId}/watch/${encodeEpisodeId(
                    episodeId
                  )}/${episodeNumber}?stream=${stream.serverName}&category=${
                    server.type
                  }`}
                  key={stream.serverId}
                >
                  {stream.serverName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ))}
      </div>
    </section>
  );
}
