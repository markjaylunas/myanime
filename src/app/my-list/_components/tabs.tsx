"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function WatchListTabs() {
  const pathname = usePathname();
  return (
    <Tabs
      aria-label="Options"
      variant="solid"
      color="primary"
      selectedKey={pathname.split("/").pop()}
    >
      <Tab
        key="watching"
        title="Watching"
        as={NextLink}
        href="/my-list/watching"
      />
      <Tab
        key="completed"
        title="Completed"
        as={NextLink}
        href="/my-list/completed"
      />
      <Tab
        key="on-hold"
        title="On Hold"
        as={NextLink}
        href="/my-list/on-hold"
      />
      <Tab
        key="dropped"
        title="Dropped"
        as={NextLink}
        href="/my-list/dropped"
      />
      <Tab
        key="plan-to-watch"
        title="Plan to Watch"
        as={NextLink}
        href="/my-list/plan-to-watch"
      />
    </Tabs>
  );
}
