"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

function Avatar({ className, src, alt, fallback, ...props }: AvatarProps) {
  const [error, setError] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      {src && !error ? (
        <img src={src} alt={alt || "Avatar"} className="h-full w-full object-cover" onError={() => setError(true)} />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-xs font-medium text-secondary-foreground">
          {fallback || alt?.charAt(0).toUpperCase() || "U"}
        </span>
      )}
    </div>
  );
}

export { Avatar, type AvatarProps };
