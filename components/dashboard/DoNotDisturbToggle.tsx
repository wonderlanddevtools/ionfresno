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
        'glass-morphism flex items-center gap-4 px-6 py-4 rounded-xl',
        'transition-all duration-300 ease-out group',
        'hover:bg-white/5 active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-primary/20',
        isDndActive && 'bg-primary/10'
      )}
      aria-pressed={isDndActive}
    >
      <Moon 
        className={cn(
          'h-5 w-5 transition-all duration-300',
          isDndActive 
            ? 'text-primary fill-primary/30' 
            : 'text-white/60 group-hover:text-white/80'
        )} 
      />
      <span className={cn(
        'text-sm font-medium transition-colors',
        isDndActive ? 'text-primary' : 'text-white/80 group-hover:text-white'
      )}>
        Do not disturb
      </span>
    </button>
  );
}