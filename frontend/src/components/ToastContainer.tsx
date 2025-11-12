"use client";

import { Toast } from "./Toast";
import ToastComponent from "./Toast";
import { useNotification } from "@/hooks/useNotification";

export default function ToastContainer() {
  const { toasts, removeToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
