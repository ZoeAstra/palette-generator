import * as React from "react"

import { cn } from "@/lib/utils"

type IInputProps = React.ComponentProps<"input"> & {
  variant?: "borderless" | "bordered";
}

function Input({ variant = "bordered", className, type, ...props }: IInputProps) {
  let cssClass = "bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-4xl border px-3 py-1 text-base transition-colors file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";
  if (variant === "borderless") {
    cssClass = "bg-input/0 transition-[box-shadow] hover:ring-[3px] hover:border-ring hover:ring-ring/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-xl px-3 py-1 text-base transition-colors file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";
  }
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        cssClass,
        className
      )}
      {...props}
    />
  )
}

export { Input }
