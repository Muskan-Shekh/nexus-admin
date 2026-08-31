"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement>;

function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div className="h-full overflow-y-auto scrollbar-thin">{children}</div>
    </div>
  );
}

export { ScrollArea, type ScrollAreaProps };
