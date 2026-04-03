import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 p-1 
      rounded-full bg-gray-200 dark:bg-gray-700 
      transition-all duration-300"
    >
      {/* Sun */}
      <Sun
        size={14}
        className={`flex-1 transition-colors duration-300
        ${theme === "light" 
          ? "text-yellow-500" 
          : "text-gray-500 dark:text-gray-400"
        }`}
      />

      {/* Moon */}
      <Moon
        size={14}
        className={`flex-1 transition-colors duration-300
        ${theme === "dark" 
          ? "text-blue-400" 
          : "text-gray-500"
        }`}
      />

      {/* Toggle Circle */}
      <div
        className={`absolute top-1 w-6 h-6 
        bg-white dark:bg-gray-900 
        rounded-full shadow-md 
        transition-all duration-300
        ${theme === "dark" ? "left-9" : "left-1"}`}
      />
    </button>
  );
}