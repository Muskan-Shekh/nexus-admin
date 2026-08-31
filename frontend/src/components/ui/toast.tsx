"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastContextValue {
  toast: (props: { title: string; description?: string; variant?: "default" | "destructive" | "success" }) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Array<{ id: string; title: string; description?: string; variant?: "default" | "destructive" | "success" }>>([]);

  const toast = React.useCallback((props: { title: string; description?: string; variant?: "default" | "destructive" | "success" }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...props }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "min-w-[300px] max-w-md rounded-lg border border-border bg-surface-elevated p-4 shadow-lg",
              t.variant === "destructive" && "border-error/50",
              t.variant === "success" && "border-success/50"
            )}
          >
            <p className="text-sm font-medium text-foreground">{t.title}</p>
            {t.description && <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
