"use client";

import { Button, ButtonGroup, ButtonGroupProps } from "@nextui-org/button";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function ServerButton(props: ButtonGroupProps) {
  const pathname = usePathname();
  return (
    <ButtonGroup size="sm" color="primary" variant="flat" {...props}>
      <Button as={NextLink} href="/s1" isDisabled={pathname.startsWith("/s1")}>
        Server 1
      </Button>
      <Button as={NextLink} href="/s2" isDisabled={pathname.startsWith("/s2")}>
        Server 2
      </Button>
    </ButtonGroup>
  );
}
