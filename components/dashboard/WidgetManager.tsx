"use client";

import { useState, createContext, useContext, useEffect } from 'react';

// Widget definition
export interface Widget {
  id: string;
  type: string;
  position: { x: number, y: number };
  visible: boolean;
}

// Context for managing widgets
interface WidgetContextType {
  widgets: Widget[];
  addWidget: (type: string, initialPosition?: { x: number, y: number }) => void;
  removeWidget: (id: string) => void;
  updateWidgetPosition: (id: string, position: { x: number, y: number }) => void;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

// Default widgets configuration
const defaultWidgets: Widget[] = [
  {
    id: 'dnd-widget',
    type: 'DoNotDisturbToggle',
    position: { x: 20, y: 80 },
    visible: true
  },
  {
    id: 'clock-widget',
    type: 'Clock',
    position: { x: 300, y: 80 },
    visible: true
  },
  {
    id: 'modern-clock-widget',
    type: 'ModernClock',
    position: { x: 500, y: 80 },
    visible: true
  },
  {
    id: 'stats-widget',
    type: 'UsageStats',
    position: { x: 20, y: 200 },
    visible: true
  }
];

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default widgets to prevent hydration mismatch
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load widgets from localStorage after component mounts (client-side only)
  useEffect(() => {
    const savedWidgets = localStorage.getItem('dashboard-widgets');
    if (savedWidgets) {
      try {
        const parsedWidgets = JSON.parse(savedWidgets);
        setWidgets(parsedWidgets);
      } catch (e) {
        console.error('Error parsing saved widgets:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save widgets to localStorage when they change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
    }
  }, [widgets, isLoaded]);

  // Add a new widget
  const addWidget = (type: string, initialPosition: { x: number, y: number } = { x: 20, y: 20 }) => {
    const newWidget: Widget = {
      id: `${type}-${Date.now()}`,
      type,
      position: initialPosition,
      visible: true
    };
    
    setWidgets(prev => [...prev, newWidget]);
  };

  // Remove a widget by id
  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id));
  };

  // Update a widget's position
  const updateWidgetPosition = (id: string, position: { x: number, y: number }) => {
    setWidgets(prev => 
      prev.map(widget => 
        widget.id === id 
          ? { ...widget, position } 
          : widget
      )
    );
  };

  return (
    <WidgetContext.Provider 
      value={{ 
        widgets, 
        addWidget, 
        removeWidget, 
        updateWidgetPosition 
      }}
    >
      {isLoaded ? children : <div className="relative w-full h-full min-h-[600px]" />}
    </WidgetContext.Provider>
  );
}

// Hook to use the widget context
export function useWidgets() {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error('useWidgets must be used within a WidgetProvider');
  }
  return context;
}
