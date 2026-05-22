import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <div className="flex items-center gap-3">
      {/* Label for accessibility/aesthetics */}
      <span className="hidden sm:inline text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider select-none">
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
      
      {/* Toggle Track */}
      <button
        onClick={onToggle}
        className="w-16 h-9 rounded-full bg-zinc-200/80 dark:bg-zinc-850 p-1 flex items-center relative cursor-pointer border border-zinc-350/50 dark:border-zinc-700/50 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 transition-colors duration-300 select-none"
        aria-label="Toggle theme"
      >
        {/* Track Icons */}
        <div className="absolute inset-0 flex justify-between px-2.5 items-center text-zinc-400 dark:text-zinc-500 pointer-events-none">
          <Sun size={14} className="opacity-80 dark:opacity-40" />
          <Moon size={14} className="opacity-40 dark:opacity-80" />
        </div>

        {/* Sliding indicator */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          animate={{ x: isDarkMode ? 28 : 0 }}
          className="w-7 h-7 rounded-full bg-white dark:bg-zinc-900 shadow-lg flex items-center justify-center relative z-10 border border-zinc-200/20 dark:border-zinc-700/40"
        >
          {isDarkMode ? (
            <motion.div
              initial={{ rotate: -90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={14} className="text-violet-400 fill-violet-400/10" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={14} className="text-amber-500 fill-amber-500/10" />
            </motion.div>
          )}
        </motion.div>
      </button>
    </div>
  );
}
