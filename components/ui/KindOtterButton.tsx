import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface KindOtterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function KindOtterButton({
  text,
  className,
  disabled,
  ...props
}: KindOtterButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex items-center justify-center whitespace-nowrap",
        "h-10 px-4 py-2",
        "bg-[#181717] hover:bg-transparent",
        "outline outline-3 outline-[#181717] outline-offset-[-3px]",
        "rounded-md border-none cursor-pointer",
        "transition-all duration-400",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <span
        className={cn(
          "text-sm font-medium text-white",
          "group-hover:text-[#181717]",
          "transition-all duration-400"
        )}
      >
        {text}
      </span>
    </button>
  );
}
