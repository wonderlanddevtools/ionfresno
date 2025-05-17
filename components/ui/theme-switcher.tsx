"use client";

import { useTheme } from 'next-themes';
import { Card } from '@/components/ui/card';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeTransition } from '@/components/theme-transition-provider';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { triggerTransition } = useThemeTransition();

  const handleThemeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    const color = newTheme === 'dark' ? '#000' : '#fff';
    triggerTransition(e.currentTarget, color);
    setTheme(newTheme);
  };

  return (
    <Card 
      className="w-full max-w-[400px] aspect-square rounded-3xl overflow-hidden cursor-pointer relative"
      onClick={handleThemeChange}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: theme === 'dark' 
            ? 'url(https://images.pexels.com/photos/3511260/pexels-photo-3511260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
            : 'url(https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Leaf className="w-8 h-8 text-white" />
      </motion.div>
    </Card>
  );
}