"use client";
import React, { useState } from "react";
import Text from "./Text";
import { Toggle } from "./toggle";

type Props = React.HTMLProps<HTMLParagraphElement> & {
  maxChars?: number;
  description: string;
  isHtmlTemplate?: boolean;
};

export default function ExpandDescription({
  description,
  maxChars,
  isHtmlTemplate = false,
  ...props
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = `${description.slice(0, maxChars || 100)}...`;

  return (
    <section {...props}>
      {isExpanded ? (
        isHtmlTemplate ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          description
        )
      ) : isHtmlTemplate ? (
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      ) : (
        <Text>shortDescription</Text>
      )}
      <Toggle
        variant="outline"
        className="mt-4 rounded-xl"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Read less" : "Read more"}
      </Toggle>
    </section>
  );
}
