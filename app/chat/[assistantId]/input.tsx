import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focusColor?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, focusColor = "black", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:border-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-75 ease-out",
          className
        )}
        style={
          {
            borderColor: "var(--input)",
            transition: "border-color 0.01s ease-out",
            ...props.style,
          } as React.CSSProperties
        }
        onFocus={(e) => {
          e.currentTarget.style.borderColor = focusColor;
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "";
          props.onBlur?.(e);
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
