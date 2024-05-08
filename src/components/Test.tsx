"use client";
type Props = {
  data: any;
};

export default function Test({ data }: Props) {
  console.log({ data });
  return <div>Test Component</div>;
}
