"use client";

"use client";

import { DoNotDisturbToggle } from '../../components/dashboard/DoNotDisturbToggle';
import { DraggableWidget } from '../../components/dashboard/DraggableWidget';
import { useWidgets, type Widget } from '../../components/dashboard/WidgetManager';
import { Clock } from '../../components/ui/clock';
import { UsageStats } from '../../components/ui/usage-stats';

// Widget renderer component
function WidgetRenderer({ widget }: { widget: Widget }) {
  const { removeWidget } = useWidgets();
  
  // Render different widget types
  const renderWidget = () => {
    switch (widget.type) {
      case 'DoNotDisturbToggle':
        return <DoNotDisturbToggle />;
      case 'Clock':
        return <Clock />;
      case 'UsageStats':
        return <UsageStats />;
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
      <DashboardContent />
    </div>
  );
}
