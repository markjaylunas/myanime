"use client";

import { signInOauth } from "@/actions/action";
import { Button, ButtonProps } from "@nextui-org/button";
import { Provider } from "@supabase/supabase-js";

type Props = {
  provider: Provider;
};

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
