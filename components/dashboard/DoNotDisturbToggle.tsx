"use client";

import { useState } from 'react';
import { Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DoNotDisturbToggle() {
  const [isDndActive, setIsDndActive] = useState(false);

  return (
    <button
      onClick={() => setIsDndActive(!isDndActive)}
      className={cn(
        'flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300',
        'bg-white/5 backdrop-blur-xl border border-white/10',
        'hover:bg-white/10 hover:border-white/20 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-white/20',
        'shadow-lg'
      )}
      aria-pressed={isDndActive}
    >
      <Moon 
        className={cn(
          'h-5 w-5 transition-all duration-300',
          isDndActive ? 'text-blue-400 fill-blue-400/30' : 'text-white/60'
        )} 
      />
      <span className="text-sm font-medium text-white">
        Do not disturb
      </span>
    </button>
  );
}