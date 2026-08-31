import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

function RadioGroup({ value, onValueChange, children, className }: RadioGroupProps) {
  return (
    <div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioProps>(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onChange: () => onValueChange?.(child.props.value as string),
          });
        }
        return child;
      })}
    </div>
  );
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

function Radio({ className, label, id, ...props }: RadioProps) {
  const generatedId = React.useId();
  const radioId = id || generatedId;
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={radioId}
        className={cn(
          "h-4 w-4 border-border bg-surface text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {label && (
        <label htmlFor={radioId} className="text-sm font-medium text-foreground cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
}

export { RadioGroup, Radio, type RadioGroupProps, type RadioProps };
