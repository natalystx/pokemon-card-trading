import { IconEnum, useViewModel } from "./viewmodel";
import { cn } from "src/utils/cn";

type IconProps = {
  icon: IconEnum;
  className?: string;
  size?: "small" | "large";
};
const Icon = ({ icon, className, size = "small" }: IconProps) => {
  const { Icon } = useViewModel(icon);
  return (
    <Icon className={cn(size === "small" ? "h-5 w-5" : "h-6 w-6", className)} />
  );
};

export default Icon;
