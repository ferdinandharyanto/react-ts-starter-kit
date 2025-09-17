import React, { ChangeEvent, useState } from "react";
import clsx from "clsx";

interface FileInputProps {
  label?: string;
  error?: string; // Add the error prop
  helperText?: string; // Add the helperText prop
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onChange: (files: FileList | null) => void;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  error,
  helperText,
  accept,
  multiple,
  disabled,
  onChange,
}) => {
  const [fileNames, setFileNames] = useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onChange(files);

    if (files && files.length > 0) {
      if (multiple) {
        setFileNames(
          Array.from(files)
            .map((file) => file.name)
            .join(", ")
        );
      } else {
        setFileNames(files[0].name);
      }
    } else {
      setFileNames("");
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <label
        className={clsx(
          "flex items-center w-full border rounded-lg shadow-sm cursor-pointer",
          "transition-all duration-300",
          {
            "border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500":
              error,
            "border-gray-200 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500":
              !error,
            "opacity-50 cursor-not-allowed": disabled,
          }
        )}
      >
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={clsx(
            "py-3 px-4 rounded-l-lg text-sm font-semibold",
            "bg-blue-50 text-blue-600 hover:bg-blue-100",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          Choose file
        </button>
        <div className="flex-1 px-4 text-sm text-gray-500 truncate">
          {fileNames || (multiple ? "No files chosen" : "No file chosen")}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
      </label>
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
