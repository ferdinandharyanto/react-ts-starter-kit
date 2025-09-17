import React, { forwardRef } from "react";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
  error?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  size?: "sm" | "md" | "lg";
  width?: string;
}

const sizeMap = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, disabled, error, size = "md", className }, ref) => {
    const sizeClasses = sizeMap[size];
    const iconSize = iconSizeMap[size];

    return (
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          onClick={onClick}
          ref={ref}
          disabled={disabled}
          readOnly
          className={clsx(
            "border rounded-md w-full pr-10",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClasses,
            error ? "border-red-500" : "border-gray-300",
            className
          )}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={onClick}
        >
          <CalendarDays size={iconSize} className="text-gray-400" />
        </div>
      </div>
    );
  }
);

export const Date = ({
  label,
  value,
  onChange,
  disabled,
  error,
  helperText,
  className,
  minDate,
  maxDate,
  size = "md",
  width = "w-full",
}: DatePickerProps) => {
  return (
    <div className={clsx("space-y-1", width)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <DatePicker
        selected={value}
        onChange={onChange}
        disabled={disabled}
        customInput={
          <CustomInput className={className} error={error} size={size} />
        }
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
        minDate={minDate}
        maxDate={maxDate}
        popperPlacement="bottom-end"
      />

      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
