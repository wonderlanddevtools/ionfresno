"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function DoNotDisturb() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Card 
      className="w-full max-w-[400px] bg-black text-white rounded-full overflow-hidden cursor-pointer"
      onClick={() => setIsActive(!isActive)}
    >
      <motion.div
        className="p-6 flex items-center space-x-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-white rounded-full"
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="text-lg">Do not disturb</span>
      </motion.div>
    </Card>
  );
}