import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import React from "react";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" ;
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  onRemove?: () => void;
  className?: string;
}

export const Badge = ({
  label,
  variant = "primary",
  size = "md",
  icon: Icon,
  className,
}: BadgeProps) => {
  const baseClasses =
    "inline-flex items-center rounded-full font-medium whitespace-nowrap";

  const sizeClasses = {
    sm: "h-5 px-2 text-xs gap-1",
    md: "h-6 px-3 text-sm gap-1.5",
    lg: "h-8 px-4 text-base gap-2",
  };

  const variantClasses = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <span
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {Icon && <Icon size={iconSize[size]} strokeWidth={2} />}
      {label}
    </span>
  );
};
