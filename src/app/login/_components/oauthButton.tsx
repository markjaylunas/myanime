"use client";

import { signInOauth } from "@/actions/action";
import { Button, ButtonProps } from "@nextui-org/button";

type Props = {
  provider: Provider;
};
type Provider = "google" | "github";

export default function OAuthButon({
  provider,
  children,
  ...props
}: ButtonProps & Props) {
  return (
    <Button onClick={() => signInOauth(provider)} {...props}>
      {children}
    </Button>
  );
}
