import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export default function NoVideo({
  children,
  className,
  bgSrc,
  title = "No Video Available",
  description = "This video is not available at the moment.",
  ...props
}: HTMLProps<HTMLDivElement> & {
  bgSrc?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        "w-full aspect-video bg-slate-700 bg-no-repeat bg-cover bg-center",
        className
      )}
      style={bgSrc ? { backgroundImage: `url(${bgSrc})` } : {}}
      {...props}
    >
      <div className="w-full h-full bg-black/75 flex flex-col justify-center items-center ">
        <h5 className="text-xl font-bold">{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}
