"use client";

import { useState } from 'react';
import { Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DoNotDisturbToggle() {
  const [isDndActive, setIsDndActive] = useState(false);

  const toggleDnd = () => {
    setIsDndActive(!isDndActive);
  };

  return (
    <button
      onClick={toggleDnd}
      className={cn(
        'flex items-center space-x-3 px-5 py-3 rounded-full transition-all duration-200 ease-in-out',
        'bg-neutral-800 hover:bg-neutral-700 text-white',
        'focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50',
        'shadow-lg transform hover:scale-105 active:scale-95'
      )}
      aria-pressed={isDndActive}
    >
      <Moon className={cn('h-5 w-5 transition-colors', isDndActive ? 'text-blue-400 fill-blue-400/30' : 'text-neutral-400')} />
      <span className="text-sm font-medium">
        Do not disturb
      </span>
    </button>
  );
}
