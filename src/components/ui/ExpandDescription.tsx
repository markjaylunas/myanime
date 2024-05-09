"use client";
import React, { useState } from "react";
import { Toggle } from "./toggle";

type Props = React.HTMLProps<HTMLParagraphElement> & {
  maxChars?: number;
  description: string;
  isHtmlTemplate?: boolean;
};

export default function ExpandDescription({
  description,
  maxChars = 100,
  isHtmlTemplate = false,
  ...props
}: Props) {
  const isTooShort = description.length <= maxChars;
  console.log({ isTooShort });
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = `${description.slice(0, maxChars)}...`;

  return (
    <section {...props}>
      {isTooShort ? (
        isHtmlTemplate ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          description
        )
      ) : isExpanded ? (
        isHtmlTemplate ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          description
        )
      ) : isHtmlTemplate ? (
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      ) : (
        shortDescription
      )}
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
