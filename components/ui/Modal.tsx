"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

interface ConfirmModalProps {
  open: boolean;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  variant?: "primary" | "danger";
  showLoading?: boolean;
}

export default function Modal({
  open,
  message = "Please confirm your action.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  onClose,
  onConfirm,
  showLoading = true,
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) setLoading(false);
  }, [open]);

  if (!open) return null;

  const handleConfirm = async () => {
    try {
      if (showLoading) setLoading(true);
      await onConfirm();
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <p className="text-md text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant={variant}
            onClick={handleConfirm}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {showLoading && loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {showLoading && loading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
