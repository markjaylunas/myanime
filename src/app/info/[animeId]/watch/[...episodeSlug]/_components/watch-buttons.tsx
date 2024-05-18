"use client";

import { Icons } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";

type WatchStatus =
  | "null"
  | "watching"
  | "completed"
  | "onHold"
  | "dropped"
  | "planning";

export default function App() {
  const [selectedOption, setSelectedOption] = useState(new Set(["null"]));

  const labelsMap: Record<WatchStatus, string> = {
    null: "Add to Watchlist",
    watching: "Watching",
    completed: "Completed",
    onHold: "On-Hold",
    dropped: "Dropped",
    planning: "Plan to Watch",
  };

  const selectedOptionValue: WatchStatus = Array.from(
    selectedOption
  )[0] as WatchStatus;

  const isNull = labelsMap[selectedOptionValue] === labelsMap["null"];
  const glow =
    "bg-gradient-to-tr from-rose-500 to-primary-500 border-small border-white/50 shadow-primary-500/30 text-white";
  return (
    <ButtonGroup variant="shadow">
      <Button
        color={isNull ? "primary" : "default"}
        disabled={!isNull}
        onPress={() =>
          isNull ? setSelectedOption(new Set(["watching"])) : null
        }
        className={cn(isNull && glow)}
      >
        {labelsMap[selectedOptionValue]}
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger disabled={isNull}>
          <Button
            color={isNull ? "default" : "primary"}
            isDisabled={isNull}
            isIconOnly
            className={cn(!isNull && glow)}
          >
            <Icons.chevronRight />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Watch list options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={(selected) => {
            if (selected instanceof Set) {
              setSelectedOption(selected as Set<string>);
            }
          }}
          className="max-w-[300px]"
        >
          {Object.keys(labelsMap)
            .slice(1)
            .map((key) => (
              <DropdownItem key={key} color="secondary">
                {labelsMap[key as WatchStatus]}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
