import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        {...props}
        className={`border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none 
        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} 
        ${className || ""}`}
      />
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : (
        helperText && (
          <span className="text-xs text-gray-500">{helperText}</span>
        )
      )}
    </div>
  );
};
