import Button from "@/components/base/Button";
import { cn } from "@/utils/cn";

type QuantityButtonProps = {
  className?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
  buttonClassName?: string;
  size?: "xs" | "sm" | "lg" | "xl";
  disabled?: boolean;
};

const QuantityButton = ({
  onIncrement,
  onDecrement,
  count,
  size = "xl",
  buttonClassName,
  disabled,
}: QuantityButtonProps) => {
  return (
    <div className={cn("w-full flex gap-x-2 items-center")}>
      <Button
        size={size}
        square
        onClick={onDecrement}
        className={cn(buttonClassName)}
      >
        -
      </Button>
      <Button
        size={size}
        disabled
        className={cn(buttonClassName, "w-full !text-white")}
      >
        {count}
      </Button>
      <Button
        disabled={disabled}
        size={size}
        square
        className={cn(buttonClassName)}
        onClick={onIncrement}
      >
        +
      </Button>
    </div>
  );
};

export default QuantityButton;
