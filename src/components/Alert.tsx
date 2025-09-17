import clsx from "clsx";
import React from "react";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

type AlertProps = {
  type?: "success" | "error" | "warning" | "info";
  children: React.ReactNode;
  onClose?: () => void;
};

const variants = {
  success: "bg-green-100 text-green-800 border-green-400",
  error: "bg-red-100 text-red-800 border-red-400",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  info: "bg-blue-100 text-blue-800 border-blue-400",
};

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  children,
  onClose,
}) => {
  const IconComponent = iconMap[type];

  return (
    <div
      className={clsx(
        "flex items-center gap-4 p-4 rounded-md border-l-4",
        variants[type]
      )}
      role="alert"
    >
      <div className="flex-shrink-0">
        <IconComponent size={20} />
      </div>

      <div className="flex-grow">{children}</div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 -m-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close alert"
        >
          <XCircle size={20} />
        </button>
      )}
    </div>
  );
};
