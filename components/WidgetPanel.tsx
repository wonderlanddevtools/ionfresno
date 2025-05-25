"use client";

import { useState } from 'react';
import { useWidgets } from './dashboard/WidgetManager';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetPanelProps {
  onClose?: () => void;
}

export function WidgetPanel({ onClose }: WidgetPanelProps) {
  const { addWidget } = useWidgets();

  const availableWidgets = [
    { type: 'DoNotDisturbToggle', name: 'Do Not Disturb', description: 'Toggle focus mode' },
    { type: 'Clock', name: 'Clock', description: 'Current time display' },
    { type: 'ModernClock', name: 'Modern Clock', description: 'Analog clock with modern styling' },
    { type: 'UsageStats', name: 'Usage Stats', description: 'Your app usage statistics' }
  ];

  const handleAddWidget = (type: string) => {
    addWidget(type, { x: Math.random() * 200 + 50, y: Math.random() * 200 + 100 });
  };

  return (
    <div className="px-3 pb-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-neutral-800">Add Widgets</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-600 hover:text-neutral-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-2">
          {availableWidgets.map(({ type, name, description }) => (
            <button
              key={type}
              type="button"
              onClick={() => handleAddWidget(type)}
              className={cn(
                'w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200',
                'bg-white/20 hover:bg-white/30 border border-white/10 hover:border-white/20',
                'text-left group'
              )}
            >
              <div className="flex-shrink-0">
                <Plus className="h-4 w-4 text-neutral-600 group-hover:text-neutral-800" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-neutral-800">{name}</div>
                <div className="text-xs text-neutral-600">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
