import { cn } from "@/lib/utils";

type Props = React.HTMLProps<HTMLParagraphElement>;

export default function Text({ children, className, ...props }: Props) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}
