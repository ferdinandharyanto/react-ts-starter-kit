import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Card = ({ title, children, footer }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t pt-2">{footer}</div>}
    </div>
  );
};
