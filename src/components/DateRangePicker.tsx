import { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import clsx from "clsx";
import { CalendarDays, X } from "lucide-react";

interface DateRangePickerProps {
  label?: string;
  value?: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const DateRangePicker = ({
  label,
  value,
  onChange,
  disabled,
  error,
  helperText,
  className,
  minDate,
  maxDate,
}: DateRangePickerProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selected: DateRange | undefined) => {
    onChange?.(selected);
    if (selected?.from && selected?.to) {
      setIsPopoverOpen(false);
    }
  };

  const selectedDatesText =
    value?.from && value?.to
      ? `${format(value.from, "MMM dd, yyyy")} - ${format(value.to, "MMM dd, yyyy")}`
      : "Select a date range";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div
      className={clsx("w-full space-y-1 relative", className)}
      ref={containerRef}
    >
      {label && <label className="block text-sm font-medium">{label}</label>}

      <div className="relative">
        <input
          type="text"
          value={selectedDatesText}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          readOnly
          disabled={disabled}
          className={clsx(
            "w-full px-3 py-2 border rounded-md cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500" : "border-gray-300",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {value?.from && value?.to && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(undefined);
              }}
              disabled={disabled}
              aria-label="Clear dates"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <CalendarDays size={20} className="text-gray-400" />
        </div>
      </div>

      {isPopoverOpen && !disabled && (
        <div className="absolute z-10 top-full mt-2 p-3 bg-white border rounded-lg shadow-lg">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={handleSelect}
            modifiersClassNames={{
              selected: "bg-blue-600 text-white rounded-md",
              today: "font-bold text-blue-600",
            }}
            min={minDate?.getTime()}
            max={maxDate?.getTime()}
            numberOfMonths={2}
          />
        </div>
      )}

      {(error || helperText) && (
        <p
          className={clsx("text-xs", error ? "text-red-500" : "text-gray-500")}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};
