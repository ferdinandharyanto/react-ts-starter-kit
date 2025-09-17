import clsx from "clsx";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "white";
  showLabel?: boolean;
  className?: string;
  striped?: boolean;
  animate?: boolean;
}

const colorMap = {
  blue: { bg: "bg-blue-600", from: "from-blue-500", to: "to-blue-600" },
  green: { bg: "bg-green-600", from: "from-green-500", to: "to-green-600" },
  red: { bg: "bg-red-600", from: "from-red-500", to: "to-red-600" },
  yellow: { bg: "bg-yellow-500", from: "from-yellow-400", to: "to-yellow-500" },
  purple: { bg: "bg-purple-600", from: "from-purple-500", to: "to-purple-600" },
  white: { bg: "bg-grey-600", from: "from-grey-500", to: "to-grey-600" },
};

export const ProgressBar = ({
  value,
  max = 100,
  color = "blue",
  showLabel = false,
  striped = false,
  animate = false,
  className,
}: ProgressBarProps) => {
  const percent = Math.min((value / max) * 100, 100);
  const selectedColor = colorMap[color];

  return (
    <div
      className={clsx(
        "w-full h-4 bg-gray-200 rounded-full shadow-inner",
        className
      )}
    >
      <div
        className={clsx(
          "h-full rounded-full transition-all duration-500 relative overflow-hidden",
          selectedColor.bg,
          {
            "shadow-md": percent > 0,
            "bg-gradient-to-r": striped,
            "animate-progress-bar": animate && striped,
            [selectedColor.from]: striped,
            [selectedColor.to]: striped,
          }
        )}
        style={{ width: `${percent}%` }}
      >
        {showLabel && (
          <span
            className={clsx(
              "absolute inset-0 flex items-center justify-center text-xs font-semibold text-white",
              {
                "text-black":
                  percent < 20 && (color === "yellow" || color === "white"),
              }
            )}
          >
            {Math.round(percent)}%
          </span>
        )}
      </div>
    </div>
  );
};
