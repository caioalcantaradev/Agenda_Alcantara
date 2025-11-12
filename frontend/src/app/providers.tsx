"use client";

import { NotificationProvider } from "@/hooks/useNotification";
import ToastContainer from "@/components/ToastContainer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      {children}
      <ToastContainer />
    </NotificationProvider>
  );
}

