"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Briefcase, CalendarDays, DollarSign, Users, BarChart3, MessageSquare, PlusCircle, MoreVertical, User } from 'lucide-react';
import { DoNotDisturbToggle } from '../../components/dashboard/DoNotDisturbToggle';
import { DraggableWidget } from '../../components/dashboard/DraggableWidget';
import { WidgetProvider, useWidgets, Widget } from '../../components/dashboard/WidgetManager';

// Widget renderer component
function WidgetRenderer({ widget }: { widget: Widget }) {
  const { removeWidget } = useWidgets();
  
  // Render different widget types
  const renderWidget = () => {
    switch (widget.type) {
      case 'DoNotDisturbToggle':
        return <DoNotDisturbToggle />;
      default:
        return <div>Unknown widget type</div>;
    }
  };
  
  return (
    <DraggableWidget 
      id={widget.id} 
      defaultPosition={widget.position}
      onRemove={removeWidget}
    >
      {renderWidget()}
    </DraggableWidget>
  );
}

// Dashboard content component
function DashboardContent() {
  const { widgets } = useWidgets();
  
  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Render all visible widgets */}
      {widgets.filter(w => w.visible).map(widget => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </div>
  );
}

// Main dashboard page component
export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 lg:p-10 h-full"> 
      <WidgetProvider>
        <DashboardContent />
      </WidgetProvider>
    </div>
  );
}
