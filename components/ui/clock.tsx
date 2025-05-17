"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function Clock() {
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <Card className="w-full max-w-[400px] aspect-square flex items-center justify-center bg-black text-white rounded-full p-8 relative">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-light">
            {date.getDate()} <span className="text-gray-500">May</span>
          </span>
        </div>
        
        <motion.div
          className="absolute w-1 bg-white rounded-full origin-bottom"
          style={{
            height: '35%',
            left: '50%',
            bottom: '50%',
            transform: `rotate(${hourDegrees}deg)`,
            transformOrigin: 'bottom',
          }}
          animate={{ rotate: hourDegrees }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        
        <motion.div
          className="absolute w-1 bg-red-500 rounded-full origin-bottom"
          style={{
            height: '45%',
            left: '50%',
            bottom: '50%',
            transform: `rotate(${minuteDegrees}deg)`,
            transformOrigin: 'bottom',
          }}
          animate={{ rotate: minuteDegrees }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>
    </Card>
  );
}