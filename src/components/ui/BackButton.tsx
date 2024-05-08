"use client";

import { Button, ButtonProps } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = ({ children, ...props }: ButtonProps) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="bordered" {...props}>
      {children}
    </Button>
  );
};

export default BackButton;
