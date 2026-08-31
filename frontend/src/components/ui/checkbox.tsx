import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={checkboxId}
        className={cn(
          "h-4 w-4 rounded border-border bg-surface text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {label && (
        <label htmlFor={checkboxId} className="text-sm font-medium text-foreground cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
}

export { Checkbox, type CheckboxProps };
