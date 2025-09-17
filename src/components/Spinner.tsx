import React from "react";
import clsx from "clsx";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
};

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", color }) => {
  const spinnerColor = color ? `border-${color}` : "border-blue-600";
  const transparentColor = color
    ? `border-t-transparent`
    : "border-t-transparent";

  return (
    <div
      className={clsx(
        "animate-spin rounded-full",
        sizes[size],
        spinnerColor,
        transparentColor
      )}
    />
  );
};
