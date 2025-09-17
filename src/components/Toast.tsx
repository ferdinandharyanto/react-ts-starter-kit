import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const typeStyles: Record<ToastType, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  warning: "bg-yellow-500 text-gray-900",
};

export const Toast = ({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsShowing(true), 10);
    const closeTimer = setTimeout(() => setIsExiting(true), duration);
    const removeTimer = setTimeout(() => onClose(id), duration + 500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }, [id, duration, onClose]);

  return createPortal(
    <div
      className={clsx(
        "relative transform transition-all duration-500",
        "mb-2 p-4 rounded-md shadow-lg flex items-center justify-between",
        typeStyles[type],
        isExiting ? "opacity-0 translate-x-full" : "opacity-100 -translate-x-0"
      )}
    >
      <span className="flex-grow">{message}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onClose(id), 500);
        }}
        className="ml-4 p-1 rounded-full hover:bg-black/10 transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div
        className="absolute bottom-0 left-0 h-1 rounded-b-md"
        style={{
          width: isShowing ? "0%" : "100%",
          transition: `width ${duration}ms linear`,
          backgroundColor: type === "warning" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
        }}
      />
    </div>,
    document.getElementById("toast-root")!
  );
};