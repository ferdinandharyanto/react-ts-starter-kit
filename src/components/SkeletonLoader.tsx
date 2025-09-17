import clsx from "clsx";
import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "rect" | "circle" | "text";
  count?: number; // Added the new count prop
}

export const SkeletonLoader = ({
  className = "",
  variant = "rect",
  count = 3,
}: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-gray-200";

  const renderSkeleton = (key: number) => (
    <div
      key={key}
      className={clsx(
        baseClasses,
        {
          "rounded-full": variant === "circle",
          "h-4 rounded": variant === "text",
          "rounded-md": variant === "rect",
        },
        className
      )}
    />
  );

  if (count === 1) {
    return renderSkeleton(0);
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </div>
  );
};
