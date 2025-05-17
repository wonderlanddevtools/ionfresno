"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  title: string;
  artist: string;
  duration: string;
  coverImage: string;
}

export function MusicPlayer({ title, artist, duration, coverImage }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="w-full max-w-[400px] bg-background/80 backdrop-blur-lg border-none shadow-lg rounded-3xl overflow-hidden">
      <motion.div 
        className="relative aspect-square overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <img 
          src={coverImage} 
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-black" />
          ) : (
            <Play className="w-5 h-5 text-black ml-1" />
          )}
        </button>
      </motion.div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{artist}</h3>
        <p className="text-muted-foreground mb-4">{title}</p>
        
        <div className="space-y-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-foreground"
              initial={{ width: "0%" }}
              animate={{ width: isPlaying ? "60%" : "0%" }}
              transition={{ duration: 30, ease: "linear" }}
            />
          </div>
          <div className="flex justify-end">
            <span className="text-sm text-muted-foreground">{duration}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}