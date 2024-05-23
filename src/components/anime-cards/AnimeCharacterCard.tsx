import { CharacterSchema } from "@/lib/meta-validations";
import { Card, CardBody } from "@nextui-org/card";
import { User } from "@nextui-org/user";
import NextLink from "next/link";

type Props = {
  character: CharacterSchema;
};

export default function AnimeCharacterCard({ character }: Props) {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
      isPressable
      as={NextLink}
      href={`/character/${character.id}`}
    >
      <CardBody className="flex flex-row gap-4 justify-between">
        <User
          name={character.name.userPreferred}
          description={character.role}
          avatarProps={{
            src: character.image,
          }}
        />
      </CardBody>
    </Card>
  );
}
