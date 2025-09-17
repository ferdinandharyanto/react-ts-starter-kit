import React from "react";
import clsx from "clsx";

interface RangeSliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

export const RangeSlider = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  disabled,
  error,
  helperText,
  className,
}: RangeSliderProps) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={clsx("w-full space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center h-4">
        <div
          className={clsx("absolute w-full h-1 bg-gray-200 rounded-full", {
            "bg-gray-400": disabled,
          })}
        />
        <div
          className={clsx(
            "absolute h-1 rounded-full bg-blue-600 transition-all duration-150",
            {
              "bg-gray-400": disabled,
              "bg-red-500": error,
            }
          )}
          style={{ width: `${percent}%` }}
        />

        <div
          className={clsx(
            "relative w-5 h-5 bg-white border border-gray-300 rounded-full shadow-md",
            "transition-all duration-150",
            "flex items-center justify-center",
            {
              "border-red-500": error,
              "opacity-50 cursor-not-allowed": disabled,
            }
          )}
          style={{ left: `calc(${percent}% - 10px)` }}
        >
          <div className="w-2 h-2 rounded-full bg-blue-600" />
          <span
            className={clsx(
              "absolute -top-8 px-2 py-1 text-xs text-white bg-gray-700 rounded-md",
              "opacity-0 group-hover:opacity-100 transition-opacity"
            )}
          >
            {value}
          </span>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(Number(e.target.value))
          }
          disabled={disabled}
          className={clsx(
            "absolute z-10 w-full h-full opacity-0 cursor-pointer",
            "peer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          )}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {(error || helperText) && (
        <p
          className={clsx(
            "text-xs mt-1",
            error ? "text-red-500" : "text-gray-500"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};
