import React from "react";
import clsx from "clsx";

type SwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled,
}) => {
  return (
    <label
      className={clsx(
        "flex items-center gap-3 cursor-pointer select-none",
        "transition-colors duration-200",
        {
          "text-gray-500 cursor-not-allowed": disabled,
        }
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div
        className={clsx(
          "w-11 h-6 rounded-full p-1 transition-colors duration-200",
          "peer-checked:bg-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-blue-500",
          {
            "bg-gray-300": !checked,
            "bg-blue-600": checked,
            "peer-disabled:opacity-50": disabled,
          }
        )}
      >
        <div
          className={clsx(
            "bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200",
            {
              "translate-x-5": checked,
              "translate-x-0": !checked,
            }
          )}
        />
      </div>
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
  );
};
