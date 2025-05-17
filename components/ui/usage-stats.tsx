"use client";

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function UsageStats() {
  return (
    <Card className="w-full max-w-[400px] bg-black text-white rounded-3xl overflow-hidden p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Usage</h3>
        <p className="text-gray-500">Last month</p>
        
        <div className="flex space-x-1 h-6">
          {['#FFFFFF', '#4169E1', '#1E1E1E'].map((color, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full"
              style={{ backgroundColor: color }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}