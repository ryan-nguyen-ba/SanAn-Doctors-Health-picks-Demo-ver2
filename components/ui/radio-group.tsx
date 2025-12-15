"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        role="radiogroup"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              checked: child.props.value === value,
              onCheckedChange: onValueChange,
            } as any);
          }
          return child;
        })}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  checked?: boolean;
  onCheckedChange?: (value: string) => void;
}

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({ className, value, label, checked, onCheckedChange, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors",
          checked
            ? "border-primary bg-primary-light"
            : "border-gray-300 hover:border-primary",
          className
        )}
      >
        <input
          type="radio"
          ref={ref}
          value={value}
          checked={checked}
          onChange={() => onCheckedChange?.(value)}
          className="w-4 h-4 text-primary"
          {...props}
        />
        <span>{label}</span>
      </label>
    );
  }
);
RadioItem.displayName = "RadioItem";

export { RadioGroup, RadioItem };

