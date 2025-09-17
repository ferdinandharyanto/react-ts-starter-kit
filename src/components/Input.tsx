import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  inputSize?: "sm" | "md" | "lg";
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPosition?: "start" | "end";
};

const sizeClasses: Record<string, string> = {
  sm: "py-2 text-sm",
  md: "py-3 text-base",
  lg: "py-4 text-lg",
};

const iconSizeClasses: Record<string, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = true,
  className,
  inputSize = "md",
  icon: IconComponent,
  iconPosition = "start",
  disabled,
  type,
  ...props
}) => {
  const iconSizeClass = iconSizeClasses[inputSize];
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  const PasswordIcon = showPassword ? EyeOff : Eye;

  const inputPaddingClass = clsx(sizeClasses[inputSize], {
    "pl-10 pr-4": IconComponent && iconPosition === "start",
    "pr-10 pl-4": IconComponent && iconPosition === "end",
    "px-4": !IconComponent,
    "pr-10": type === "password"
  });

  return (
    <div className={clsx("flex flex-col gap-1", { "w-full": fullWidth })}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {IconComponent && (
          <div
            className={clsx(
              "absolute inset-y-0 flex items-center text-gray-400 transition-colors duration-200",
              {
                "left-3": iconPosition === "start",
                "right-5": iconPosition === "end",
              }
            )}
          >
            <IconComponent className={iconSizeClass} />
          </div>
        )}
        
        {/* Password toggle icon */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-5 flex items-center text-gray-400"
          >
            <PasswordIcon className={iconSizeClass} />
          </button>
        )}

        <input
          {...props}
          type={inputType}
          disabled={disabled}
          className={clsx(
            "border rounded-lg shadow-sm transition-all duration-300 w-full",
            inputPaddingClass,
            {
              "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500":
                error,
              "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500":
                !error,
              "hover:border-gray-400": !error && !disabled,
              "bg-gray-100 text-gray-500 cursor-not-allowed": disabled,
            },
            "focus:outline-none",
            className
          )}
        />
      </div>
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