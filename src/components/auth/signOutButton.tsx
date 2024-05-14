"use client";

import { signOut } from "@/actions/action";
import { Button, ButtonProps } from "@nextui-org/button";

export default function SignOutButton({ children, ...props }: ButtonProps) {
  return (
    <Button onClick={() => signOut()} {...props}>
      {children}
    </Button>
  );
}
