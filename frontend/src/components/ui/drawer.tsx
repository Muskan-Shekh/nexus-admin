"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: "left" | "right";
  width?: string;
}

function Drawer({ open, onClose, title, description, children, footer, side = "right", width = "480px" }: DrawerProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 ${side === "right" ? "right-0" : "left-0"} h-full border-l border-border bg-surface shadow-2xl transition-transform duration-200 ${open ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full"}`}
        style={{ width: "100%", maxWidth: width }}
      >
        <div className="flex h-full flex-col">
          {(title || description) && (
            <div className="flex items-start justify-between border-b border-border p-6">
              <div>
                {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
                {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex-1 overflow-auto scrollbar-thin">{children}</div>
          {footer && <div className="border-t border-border p-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export { Drawer, type DrawerProps };
