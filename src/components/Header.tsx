import React from 'react';
import { Moon, Sun } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

interface HeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDark, toggleDarkMode }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-violet-500 to-purple-600 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <AnimatedLogo />
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}