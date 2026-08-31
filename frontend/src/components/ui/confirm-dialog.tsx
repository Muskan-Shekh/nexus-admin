import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  loading?: boolean;
}

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description} footer={
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant={variant === "destructive" ? "destructive" : "default"} onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    }>
      {description && (
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0 rounded-full bg-warning/10 p-1.5">
            <AlertTriangle className="h-4 w-4 text-warning" />
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}
    </Modal>
  );
}

export { ConfirmDialog, type ConfirmDialogProps };
