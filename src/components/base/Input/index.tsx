import { cn } from "@/utils/cn";
import React, { forwardRef } from "react";

type InputProps = {
  startIcon?: React.ReactNode;
  wrapperClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ startIcon, wrapperClassName, ...rest }, ref) => {
    return (
      <div
        className={cn(
          "flex h-12 p-3.5 border border-darkGray focus-within:border-white text-white rounded-lg gap-x-2 items-center",
          wrapperClassName
        )}
      >
        {startIcon}
        <input
          {...rest}
          ref={ref}
          className="!border-none !outline-none !ring-0 bg-transparent w-full text-white placeholder-offWhite text-sm !p-0"
        />
      </div>
    );
  }
);

export default Input;
