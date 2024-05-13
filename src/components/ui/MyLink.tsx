"use client";

import { LinkProps, Link as UILink } from "@nextui-org/link";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyLink({ children, ...props }: LinkProps) {
  const pathname = usePathname();
  const isActive = pathname === props.href;
  return (
    <UILink as={Link} color={isActive ? "primary" : "foreground"} {...props}>
      {children}
    </UILink>
  );
}
