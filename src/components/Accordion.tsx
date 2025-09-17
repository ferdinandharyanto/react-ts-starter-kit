import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
}

export const Accordion = ({ items, multiple = false }: AccordionProps) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (multiple) {
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index]
      );
    } else {
      setActiveIndexes(activeIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isOpen = activeIndexes.includes(index);
        return (
          <div
            key={index}
            className={clsx(
              "rounded-lg border-b border-gray-200 bg-white shadow-sm",
              isOpen ? "border-b-0 rounded-b-none" : "border-b"
            )}
          >
            <button
              id={`accordion-item-${index}`}
              className={clsx(
                "flex w-full items-center justify-between p-4 text-left transition-colors duration-200",
                "outline-none",
                isOpen
                  ? "bg-gray-100 font-semibold text-gray-900"
                  : "hover:bg-gray-50 text-gray-700"
              )}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <span className="text-lg">{item.title}</span>
              <ChevronDown
                className={clsx(
                  "h-6 w-6 transform transition-transform duration-300",
                  isOpen ? "rotate-180 text-blue-600" : ""
                )}
              />
            </button>
            <div
              id={`accordion-content-${index}`}
              role="region"
              aria-labelledby={`accordion-item-${index}`}
              hidden={!isOpen}
              className={clsx(
                "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 pb-4 pt-2 text-gray-600">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
