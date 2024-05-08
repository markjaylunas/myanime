import { LinkProps, Link as UILink } from "@nextui-org/link";
import Link from "next/link";

export default function MyLink({ children, ...props }: LinkProps) {
  return (
    <UILink as={Link} {...props}>
      {children}
    </UILink>
  );
}
