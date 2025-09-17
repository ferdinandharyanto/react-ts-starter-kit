import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  User,
  Home,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  title?: string;
};

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { label: "Home", icon: <Home size={18} />, path: "/" },
  { label: "Menu 1", icon: <ShoppingBag size={18} />, path: "#" },
  {
    label: "Menu 2",
    icon: <Users size={18} />,
    children: [
      { label: "Menu 2.1", path: "#" },
      { label: "Menu 2.2", path: "#" },
      { label: "Menu 2.3", path: "#" },
    ],
  },
  {
    label: "Menu 3",
    icon: <BarChart3 size={18} />,
    children: [
      { label: "Menu 3.1", path: "#" },
      { label: "Menu 3.2", path: "#" },
    ],
  },
  { label: "Menu 4", icon: <Settings size={18} />, path: "#" },
];

export default function DefaultLayout({
  children,
  title = "Dashboard",
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const openParents: string[] = [];
    menuItems.forEach((item) => {
      if (item.children?.some((child) => child.path === location.pathname)) {
        openParents.push(item.label);
      }
    });
    setOpenMenus(openParents);
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isExpanded = sidebarOpen || hovered;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <motion.aside
        onMouseEnter={() => !sidebarOpen && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: isExpanded ? 256 : 64 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-sm overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4">
          {isExpanded && <div className="text-lg font-bold">My App</div>}
          <span>Logo</span>
        </div>

        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              isOpen={openMenus.includes(item.label)}
              toggleMenu={toggleMenu}
              activePath={location.pathname}
              expanded={isExpanded}
            />
          ))}
        </nav>
      </motion.aside>

      <div
        className={clsx(
          "flex flex-col flex-1 transition-all",
          isExpanded ? "lg:ml-64" : "lg:ml-16"
        )}
      >
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex justify-center items-center">
                <button
                  onClick={() => setSidebarOpen((s) => !s)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Menu size={18} />
                </button>
                <span className="text-lg font-semibold">{title}</span>
              </div>
              <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                <User size={16} />
                <span className="hidden sm:inline-block text-sm">Hi, User</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <section className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  item,
  isOpen,
  toggleMenu,
  activePath,
  expanded,
}: {
  item: MenuItem;
  isOpen: boolean;
  toggleMenu: (label: string) => void;
  activePath: string;
  expanded: boolean;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === activePath;

  return (
    <div>
      <button
        onClick={() => hasChildren && toggleMenu(item.label)}
        className={clsx(
          "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          isActive
            ? "bg-blue-50 text-blue-600 font-medium"
            : "hover:bg-gray-50",
          !expanded ? "justify-center" : ""
        )}
      >
        {item.icon}
        {expanded && <span>{item.label}</span>}
        {hasChildren && expanded && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="ml-auto"
          >
            <ChevronDown size={16} />
          </motion.div>
        )}
      </button>

      {hasChildren && expanded && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-6 mt-1 space-y-1"
            >
              {item.children!.map((child) => {
                const childActive = child.path === activePath;
                return (
                  <Link
                    key={child.label}
                    to={child.path!}
                    className={clsx(
                      "block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                      childActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
