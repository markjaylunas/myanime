import { Image, ImageProps } from "@nextui-org/image";
import NextImage from "next/image";

export default function MyImage(props: ImageProps) {
  return <Image as={NextImage} alt="image" {...props} />;
}
