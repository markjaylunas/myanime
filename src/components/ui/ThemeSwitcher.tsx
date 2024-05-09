"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icons } from "./Icons";

export function ThemeSwitcher(props: ButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  console.log({ theme });
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <Skeleton className={cn("size-8 rounded-md", props.className)} />;

  return (
    <Button
      variant="light"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      isIconOnly
      size="sm"
      {...props}
    >
      {theme === "dark" ? (
        <Icons.moon className="size-5" />
      ) : (
        <Icons.sun className="size-5" />
      )}
    </Button>
  );
}
