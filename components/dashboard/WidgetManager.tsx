"use client";

import React, { useState, createContext, useContext, useEffect } from 'react';

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
  }
];

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  // Try to load widgets from localStorage, or use default
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    if (typeof window !== 'undefined') {
      const savedWidgets = localStorage.getItem('dashboard-widgets');
      if (savedWidgets) {
        try {
          return JSON.parse(savedWidgets);
        } catch (e) {
          console.error('Error parsing saved widgets:', e);
        }
      }
    }
    return defaultWidgets;
  });

  // Save widgets to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
    }
  }, [widgets]);

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
      {children}
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
