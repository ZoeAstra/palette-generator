"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function HueSlider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 360,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="rounded-4xl data-horizontal:h-3 data-vertical:w-3 relative grow overflow-hidden data-horizontal:w-full data-vertical:h-full"
        style={{
                  background: "linear-gradient(90deg, oklch(70% .4 0) 0%, oklch(70% .4 36) 10%, oklch(70% .4 72) 20%, oklch(70% .4 108) 30%, oklch(70% .4 144) 40%, oklch(70% .4 180) 50%, oklch(70% .4 216) 60%, oklch(70% .4 252) 70%, oklch(70% .4 288) 80%, oklch(70% .4 0) 90%, oklch(70% .4 360) 100%)"
                }}
      >
        <SliderPrimitive.Range 
          data-slot="slider-range"
          className="bg-transparent absolute select-none data-horizontal:h-full data-vertical:w-full"
        />
        <SliderPrimitive.Range 
          data-slot="slider-range"
          className="bg-transparent absolute select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 size-4 rounded-4xl border bg-white shadow-sm transition-colors hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { HueSlider }
