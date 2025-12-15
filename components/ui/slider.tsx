"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <input
        type="range"
        ref={ref}
        className={cn(
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary",
          className
        )}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        {...props}
      />
    );
  }
);
Slider.displayName = "Slider";

export { Slider };

