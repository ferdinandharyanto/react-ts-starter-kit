import React from "react";
import clsx from "clsx";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className,
  disabled,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={clsx(
          "flex items-center gap-2 cursor-pointer transition-colors duration-200",
          {
            "text-gray-500 cursor-not-allowed": disabled,
          }
        )}
      >
        <input
          type="checkbox"
          disabled={disabled}
          {...props}
          className={clsx(
            "w-4 h-4 rounded text-blue-600 border-gray-300",
            "transition-all duration-200",
            "checked:bg-blue-600 checked:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "outline-none",
            {
              "border-red-500": error,
            },
            className
          )}
        />
        {label && (
          <span
            className={clsx("text-sm text-gray-700", {
              "text-gray-500": disabled,
            })}
          >
            {label}
          </span>
        )}
      </label>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
