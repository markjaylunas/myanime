"use client";
import React, { useState } from "react";
import { Toggle } from "./toggle";

type Props = React.HTMLProps<HTMLParagraphElement> & {
  maxChars?: number;
  description: string;
};

export default function ExpandDescription({
  description,
  maxChars = 100,
  ...props
}: Props) {
  const isTooShort = description.length <= maxChars;
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = `${description.slice(0, maxChars)}...`;

  return (
    <section className="flex flex-col gap-2">
      <p {...props}>
        {isTooShort || isExpanded ? description : shortDescription}
      </p>
      {!isTooShort && (
        <Toggle
          variant="outline"
          className="mt-4 rounded-xl"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </Toggle>
      )}
    </section>
  );
}
