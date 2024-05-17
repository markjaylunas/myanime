"use client";

import { OAuthProvider } from "@/lib/types";
import { Button, ButtonProps } from "@nextui-org/button";
import { signIn } from "next-auth/react";

type Props = {
  provider: OAuthProvider;
};

export default function OAuthButon({
  provider,
  children,
  ...props
}: ButtonProps & Props) {
  return (
    <Button onClick={() => signIn(provider)} {...props}>
      {children}
    </Button>
  );
}
