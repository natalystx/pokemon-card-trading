import { cn } from "@/utils/cn";
import React, { forwardRef } from "react";

type ButtonProps = {
  icon?: React.ReactNode;
  color?: "primary" | "accent" | "neutral";
  size?: "xs" | "sm" | "lg" | "xl";
  square?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      color = "neutral",
      size = "sm",
      icon,
      square,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        {...rest}
        className={cn(
          "py-2 rounded-lg bg-white/8 hover:bg-white/18 disabled:bg-white/4 text-white disabled:text-white/40 text-xs font-medium h-9.5 flex justify-center items-center !outline-none",
          square && "aspect-square min-w-min",
          size === "xs" && "h-8",
          size === "lg" && "h-12",
          size === "xl" && "h-13.5",
          square && size === "xs" && "size-8",
          square && size === "sm" && "size-9.5",
          square && size === "lg" && "size-12",
          square && size === "xl" && "size-13.5",
          color === "accent" &&
            "bg-accent shadow-2xl hover:bg-accent/80 disabled:bg-accent/40",
          color === "primary" && "bg-primary border-darkGray border",
          !!icon && "gap-x-2",
          className
        )}
        ref={ref}
      >
        {icon || null}
        {children}
      </button>
    );
  }
);

export default Button;
