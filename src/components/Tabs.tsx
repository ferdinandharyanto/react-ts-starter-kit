import { useState, ReactNode } from "react";
import clsx from "clsx";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      <div className="relative flex">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={clsx(
              "flex-1 px-4 py-2 text-sm font-medium text-center",
              "transition-colors duration-200",
              active === idx
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700",
              "outline-none"
            )}
          >
            {tab.label}
          </button>
        ))}
        <div
          className={clsx(
            "absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out"
          )}
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${active * 100}%)`,
          }}
        />
      </div>
      <div className="p-4 rounded-lg bg-gray-50 mt-4">
        {tabs[active].content}
      </div>
    </div>
  );
};