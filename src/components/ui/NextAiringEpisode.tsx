import { Card, CardBody } from "@nextui-org/card";
import moment from "moment";

type Props = {
  airingTime: number;
  episode: number;
};

export default function NextAiringEpisode({ airingTime, episode }: Props) {
  const label = `Episode ${episode} is estimated to air on `;
  const value = moment
    .unix(airingTime)
    .utc()
    .add(9, "hours")
    .format("dddd, M/D/YYYY, h:mm:ss A");

  return (
    <Card>
      <CardBody>
        {label}
        {value}
      </CardBody>
    </Card>
  );
}
