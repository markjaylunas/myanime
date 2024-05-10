import { Button, ButtonGroup, ButtonGroupProps } from "@nextui-org/button";

type Props = {
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  onPrevClick?: () => void;
  onNextClick?: () => void;
};

export default function SimplePagination({
  prevDisabled,
  nextDisabled,
  onPrevClick,
  onNextClick,
  ...props
}: ButtonGroupProps & Props) {
  return (
    <ButtonGroup {...props}>
      <Button disabled={prevDisabled} onClick={onPrevClick}>
        Prev
      </Button>
      <Button disabled={nextDisabled} onClick={onNextClick}>
        Next
      </Button>
    </ButtonGroup>
  );
}
