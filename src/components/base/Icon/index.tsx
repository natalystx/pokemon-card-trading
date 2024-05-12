import { IconEnum, useViewModel } from "./viewmodel";
import { cn } from "@/utils/cn";

type IconProps = {
  icon: IconEnum;
  className?: string;
  size?: "sm" | "md" | "lg";
};
const Icon = ({ icon, className, size = "sm" }: IconProps) => {
  const { Icon } = useViewModel(icon);
  return (
    <Icon
      className={cn(
        size === "sm" && "h-4 w-4",
        size === "md" && "h-5 w-5",
        size === "lg" && "h-6 w-6",
        className
      )}
    />
  );
};

export default Icon;
