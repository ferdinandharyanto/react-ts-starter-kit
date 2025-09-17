import { ReactNode, useState } from "react";
import clsx from "clsx";

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const positionClasses = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
  left: "right-full mr-2",
  right: "left-full ml-2",
};

export const Tooltip = ({
  text,
  children,
  position = "bottom",
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={clsx(
            "absolute z-50 transform",
            "px-5 py-4 text-sm bg-gray-800 text-white rounded-md",
            "shadow-lg transition-all duration-200",
            positionClasses[position],
            {
              "opacity-100 scale-100": visible,
              "opacity-0 scale-95": !visible,
              "origin-bottom": position === "top",
              "origin-top": position === "bottom",
              "origin-right": position === "left",
              "origin-left": position === "right",
            }
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
};
