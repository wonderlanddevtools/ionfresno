"use client";

import { DoNotDisturbToggle } from '../../components/dashboard/DoNotDisturbToggle';
import { DraggableWidget } from '../../components/dashboard/DraggableWidget';
import { useWidgets, type Widget } from '../../components/dashboard/WidgetManager';
import { Clock } from '../../components/ui/clock';
import { UsageStats } from '../../components/ui/usage-stats';
import { ModernClock } from '../../components/ui/modern-clock';

function WidgetRenderer({ widget }: { widget: Widget }) {
  const { removeWidget } = useWidgets();
  
  const renderWidget = () => {
    switch (widget.type) {
      case 'DoNotDisturbToggle':
        return <DoNotDisturbToggle />;
      case 'Clock':
        return <Clock />;
      case 'ModernClock':
        return (
          <div className="w-48 h-48 p-2">
            <ModernClock 
              size={160} 
              background="rgba(255, 255, 255, 0.05)" 
              handColor="#ffffff" 
              tickColor="#cccccc" 
              showTicks={true} 
            />
          </div>
        );
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

function DashboardContent() {
  const { widgets } = useWidgets();
  
  return (
    <div className="relative w-full h-full min-h-[600px]">
      {widgets.filter(w => w.visible).map(widget => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 lg:p-10 h-full animate-fade-up"> 
      <DashboardContent />
    </div>
  );
}