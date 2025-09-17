import React from "react";
import Select, { StylesConfig } from "react-select";
import clsx from "clsx";

type SelectProps = {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  isMulti?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (selectedOption: unknown) => void;
  value?: unknown;
};

const customStyles = (error: boolean, disabled: boolean): StylesConfig => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: disabled ? "#f3f4f6" : "white",
    borderColor: error ? "#ef4444" : state.isFocused ? "#3b82f6" : "#e5e7eb",
    boxShadow: state.isFocused
      ? error
        ? "0 0 0 1px #ef4444"
        : "0 0 0 1px #3b82f6"
      : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "&:hover": {
      borderColor: error ? "#ef4444" : "#9ca3af",
    },
    borderRadius: "0.5rem",
    minHeight: "48px",
    transition: "all 0.3s ease-in-out",
    cursor: disabled ? "not-allowed" : "pointer",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#9ca3af",
    "&:hover": {
      color: "#6b7280",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#4b5563",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    borderRadius: "0.25rem",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#1d4ed8",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    "&:hover": {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#eff6ff" : "white",
    color: state.isFocused ? "#1e40af" : "inherit",
    "&:active": {
      backgroundColor: "#dbeafe",
    },
  }),
});

export const SelectComponent: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  fullWidth = true,
  className,
  disabled,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1",
        { "w-full": fullWidth },
        className
      )}
    >
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Select
        styles={customStyles(!!error, !!disabled)}
        isDisabled={disabled}
        classNamePrefix="react-select"
        {...props}
      />
      {error ? (
        <span className="text-xs text-red-500 mt-1">{error}</span>
      ) : (
        helperText && (
          <span className="text-xs text-gray-500 mt-1">{helperText}</span>
        )
      )}
    </div>
  );
};
