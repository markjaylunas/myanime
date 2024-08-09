"use client";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import HTMLParse from "html-react-parser";
import React, { useState } from "react";

type Props = React.HTMLProps<HTMLParagraphElement> & {
  maxChars?: number;
  description: string;
  isHTML?: boolean;
};

export default function ExpandDescription({
  description,
  maxChars = 100,
  className,
  isHTML = false,
  ...props
}: Props) {
  const isTooShort = description.length <= maxChars || description.length < 50;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="flex indent-8 flex-col justify-center items-center">
      <p
        className={cn(
          "text-foreground-500 text-justify",
          !isTooShort && !isExpanded ? "line-clamp-3" : "",
          className
        )}
        {...props}
      >
        {isHTML ? HTMLParse(description) : description}
      </p>
      {!isTooShort && (
        <Button
          variant="light"
          size="sm"
          className="mt-1rounded-xl"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Read more
        </Button>
      )}
    </section>
  );
}
