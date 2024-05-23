import { AnimeCharacterSchema } from "@/lib/meta-validations";
import { formatDescription } from "@/lib/utils";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";
import HTMLParse from "html-react-parser";
import moment from "moment";

type Props = {
  character: AnimeCharacterSchema;
};

export default function CharacterInfo({ character }: Props) {
  const name =
    character.name.userPreferred ||
    character.name.full ||
    character.name.native;

  return (
    <>
      <section className="flex flex-col md:flex-row gap-4 items-start justify-start">
        <Image
          src={character.image}
          alt={name}
          radius="full"
          classNames={{
            wrapper:
              "z-0 w-full h-full mx-auto bg-blur-md flex items-center justify-center",
            img: "object-cover aspect-square min-w-full min-h-full",
          }}
        />

        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-center md:text-left text-3xl scroll-m-20 text-pretty font-bold tracking-tight">
            {name}
          </h1>

          <p className="text-center md:text-left text-sm text-gray-500 dark:text-gray-400">
            {[
              character.name.native,
              ...character.name.alternative,
              ...character.name.alternativeSpoiler,
            ].join(", ")}
          </p>

          <Spacer y={2} />

          <div className="space-y-2">
            <Detail label="Age" value={character.age} />

            <Detail
              label="Birthdate"
              value={[
                character.dateOfBirth.month
                  ? moment()
                      .month(character.dateOfBirth.month - 1)
                      .format("MMMM")
                  : null,
                character.dateOfBirth.day,
                character.dateOfBirth.year,
              ]
                .filter(Boolean)
                .join(" ")}
            />

            <Detail label="Gender" value={character.gender} />
            <Detail
              label="Blood Type"
              value={character.bloodType || "Unknown"}
            />
            <Detail label="Height" value={character.height} />
          </div>
        </div>
      </section>

      <p>{HTMLParse(formatDescription(character.description))}</p>
    </>
  );
}

const Detail = ({ label, value }: { label: string; value: string }) => {
  return (
    <p>
      {" "}
      <span className="font-medium ">{label}:</span>&nbsp;
      <span className="text-gray-700 dark:text-gray-300">{value}</span>
    </p>
  );
};
