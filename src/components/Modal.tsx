import React, { ReactNode, useEffect } from "react";
import clsx from "clsx";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  size = "md",
}: ModalProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const sizeClass = sizeMap[size];

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 overflow-y-auto transition-all duration-300",
        {
          "visible bg-black/50 backdrop-blur-sm": isOpen,
          invisible: !isOpen,
        }
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          "relative m-4 flex flex-col justify-center min-h-screen",
          "transform transition-all duration-300",
          {
            "scale-100 opacity-100": isOpen,
            "scale-95 opacity-0": !isOpen,
          }
        )}
      >
        <div
          className={clsx(
            "bg-white rounded-lg shadow-2xl p-6 mx-auto w-full",
            sizeClass,
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-900">
                {title}
              </span>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          <div className="text-gray-700 mb-4">{children}</div>

          {footer && <div className="mt-4">{footer}</div>}
        </div>
      </div>
    </div>
  );
};
