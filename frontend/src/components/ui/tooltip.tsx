"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  content?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

function Tooltip({ open, onOpenChange, children, content, side = "top" }: TooltipProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  return (
    <div className="relative inline-flex">
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ onMouseEnter: () => void; onMouseLeave: () => void }>, {
            onMouseEnter: () => setIsOpen(true),
            onMouseLeave: () => setIsOpen(false),
          })
        : children}
      {isOpen && content && (
        <div
          className={cn(
            "absolute z-50 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs text-foreground shadow-md",
            side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            side === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
            side === "right" && "left-full top-1/2 -translate-y-1/2 ml-2"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function TooltipContent({ children, side = "top" }: { children: React.ReactNode; side?: "top" | "bottom" | "left" | "right" }) {
  return <>{children}</>;
}

export { Tooltip, TooltipTrigger, TooltipContent };
