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
        'premium-card flex items-center gap-3 px-6 py-4',
        'transition-all duration-300 ease-out',
        'hover:bg-white/10 active:scale-98',
        'focus:outline-none focus:ring-2 focus:ring-primary/20'
      )}
      aria-pressed={isDndActive}
    >
      <Moon 
        className={cn(
          'h-5 w-5 transition-all duration-300',
          isDndActive 
            ? 'text-primary fill-primary/30' 
            : 'text-white/60'
        )} 
      />
      <span className="text-sm font-medium text-white">
        Do not disturb
      </span>
    </button>
  );
}