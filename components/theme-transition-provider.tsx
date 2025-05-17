"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeTransitionContextType {
  triggerTransition: (element: HTMLElement, color: string) => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType>({
  triggerTransition: () => {},
});

export function useThemeTransition() {
  return useContext(ThemeTransitionContext);
}

export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<{
    active: boolean;
    position: { x: number; y: number };
    color: string;
  }>({
    active: false,
    position: { x: 0, y: 0 },
    color: '',
  });

  const triggerTransition = useCallback((element: HTMLElement, color: string) => {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setOverlay({
      active: true,
      position: { x, y },
      color,
    });

    setTimeout(() => {
      setOverlay(prev => ({ ...prev, active: false }));
    }, 500);
  }, []);

  return (
    <ThemeTransitionContext.Provider value={{ triggerTransition }}>
      <AnimatePresence>
        {overlay.active && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: overlay.position.y,
              left: overlay.position.x,
              backgroundColor: overlay.color,
              borderRadius: '50%',
              width: '10px',
              height: '10px',
              zIndex: 9999,
              pointerEvents: 'none',
              transformOrigin: 'center',
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </ThemeTransitionContext.Provider>
  );
}