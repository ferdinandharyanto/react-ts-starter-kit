import clsx from "clsx";
import React, { useState } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "info"
    | "warning"
    | "light"
    | "dark";
  styleType?: "solid" | "outlined" | "dashed" | "filled" | "text" | "link";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPosition?: "start" | "end";
  iconOnly?: boolean;
  shape?: "default" | "round" | "circle";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors outline-none";

const shapeClasses: Record<string, string> = {
  default: "rounded-lg",
  round: "rounded-full px-5",
  circle: "rounded-full",
};

const sizeClasses: Record<string, string> = {
  sm: "text-sm px-3 py-1 min-h-[32px]",
  md: "text-base px-4 py-2 min-h-[40px]",
  lg: "text-lg px-6 py-3 min-h-[48px]",
};

const iconOnlySizeClasses: Record<string, string> = {
  sm: "h-[32px] w-[32px] p-1.5",
  md: "h-[40px] w-[40px] p-2",
  lg: "h-[48px] w-[48px] p-3",
};

const variantStyles: Record<string, Record<string, string>> = {
  primary: {
    solid: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outlined:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    dashed:
      "border border-dashed border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    filled: "bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500",
    text: "text-blue-600 hover:text-blue-700 focus:ring-0",
    link: "text-blue-600 underline hover:text-blue-800 focus:ring-0",
  },
  secondary: {
    solid: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outlined:
      "border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-400",
    dashed:
      "border border-dashed border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-400",
    filled: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
    text: "text-gray-800 hover:text-gray-900 focus:ring-0",
    link: "text-gray-800 underline hover:text-gray-900 focus:ring-0",
  },
  success: {
    solid: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    outlined:
      "border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
    dashed:
      "border border-dashed border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
    filled:
      "bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500",
    text: "text-green-600 hover:text-green-700 focus:ring-0",
    link: "text-green-600 underline hover:text-green-800 focus:ring-0",
  },
  info: {
    solid: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
    outlined:
      "border border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500",
    dashed:
      "border border-dashed border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500",
    filled: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 focus:ring-cyan-500",
    text: "text-cyan-600 hover:text-cyan-700 focus:ring-0",
    link: "text-cyan-600 underline hover:text-cyan-800 focus:ring-0",
  },
  warning: {
    solid: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
    outlined:
      "border border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400",
    dashed:
      "border border-dashed border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400",
    filled:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-yellow-400",
    text: "text-yellow-500 hover:text-yellow-700 focus:ring-0",
    link: "text-yellow-500 underline hover:text-yellow-600 focus:ring-0",
  },
  danger: {
    solid: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outlined:
      "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
    dashed:
      "border border-dashed border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
    filled: "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500",
    text: "text-red-600 hover:text-red-700 focus:ring-0",
    link: "text-red-600 underline hover:text-red-800 focus:ring-0",
  },
  light: {
    solid: "bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
    outlined:
      "border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
    dashed:
      "border border-dashed border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
    filled: "bg-gray-50 text-gray-800 hover:bg-gray-100 focus:ring-gray-300",
    text: "text-gray-800 hover:text-gray-900 focus:ring-0",
    link: "text-gray-800 underline hover:text-gray-900 focus:ring-0",
  },
  dark: {
    solid: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
    outlined:
      "border border-gray-800 text-gray-800 hover:bg-gray-50 focus:ring-gray-700",
    dashed:
      "border border-dashed border-gray-800 text-gray-800 hover:bg-gray-50 focus:ring-gray-700",
    filled: "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-700",
    text: "text-gray-800 hover:text-gray-900 focus:ring-0",
    link: "text-gray-800 underline hover:text-gray-900 focus:ring-0",
  },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  styleType = "solid",
  loading = false,
  disabled,
  fullWidth = false,
  icon: IconComponent,
  iconPosition = "start",
  iconOnly = false,
  shape = "default",
  size = "md",
  className,
  ...props
}) => {
  const shapeClass = shapeClasses[shape];
  const sizeClass = iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size];
  
  const [isClicked, setIsClicked] = useState<boolean>(false);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e)
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
  }

  const content = iconOnly ? (
    IconComponent && <IconComponent className="h-5 w-5" />
  ) : (
    <>
      {loading && (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      )}
      {!loading && IconComponent && iconPosition === "start" && (
        <IconComponent className="h-4 w-4" />
      )}
      <span>{children}</span>
      {!loading && IconComponent && iconPosition === "end" && (
        <IconComponent className="h-4 w-4" />
      )}
    </>
  );

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={disabled || loading}
      className={clsx(
        base,
        sizeClass,
        shapeClass,
        variantStyles[variant][styleType],
        fullWidth && !iconOnly && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        isClicked ? "scale-95" : "scale-100",
        'transform transition-transform duration-150 active:scale-95',
        className
      )}
    >
      {content}
    </button>
  );
};
