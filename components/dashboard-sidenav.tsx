"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CalendarClock, Building, BarChart3, UserCircle, Settings, Grid3X3 } from 'lucide-react';
import { useState } from 'react';
import { WidgetPanel } from './WidgetPanel';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/reservations', label: 'My Reservations', icon: CalendarClock },
  { href: '/dashboard/properties', label: 'Properties', icon: Building },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/account', label: 'Account', icon: UserCircle },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardSidenav() {
  const pathname = usePathname();
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);

  // CSS Modules provide better encapsulation and don't get overridden by global styles

  // Apple/Jony Ive-style glassmorphism container styles
  const glassContainerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(30px) saturate(180%)',
    WebkitBackdropFilter: 'blur(30px) saturate(180%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
    borderRadius: '22px',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    letterSpacing: '-0.01em',
    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))'
  };
  
  // The subtle border highlight effect
  const borderElementStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '22px',
    border: '0.5px solid rgba(255, 255, 255, 0.15)',
    boxShadow: 'inset 0 0.5px 0 0 rgba(255, 255, 255, 0.2)',
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0) 15%)',
    pointerEvents: 'none',
    zIndex: 1
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-transparent bg-transparent dark:bg-transparent dark:border-transparent sm:flex">
      {/* Apply direct inline styles for reliable Apple-style glassmorphism */}
      <div style={glassContainerStyle}>
        {/* Border element with direct styling */}
        <div style={borderElementStyle} /> 
        <div className="p-6 border-b border-white/10"> 
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <span className="font-playfair-display text-[1.6rem] font-semibold text-neutral-800 group-hover:text-black transition-all duration-200 ease-in-out group-hover:tracking-tight"> 
              WonderReserve
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-2"> 
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 ease-out group', 
                  isActive
                    ? 'bg-black/5 text-black font-medium' /* Lighter background, maximum contrast - Apple style */
                    : 'text-[#464646] hover:text-black hover:bg-black/[0.02]', /* Precise Apple gray text color */
                  'text-[13px] tracking-tight'
                )}
              >
                <item.icon className={cn(
                  'transition-colors h-[18px] w-[18px]', /* Precise Apple icon sizing */
                  isActive ? 'text-black' : 'text-[#646464] group-hover:text-black'
                )} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          {/* Widgets Button */}
          <button
            type="button"
            onClick={() => setShowWidgetPanel(!showWidgetPanel)}
            className={cn(
              'flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 ease-out group w-full', 
              showWidgetPanel
                ? 'bg-black/5 text-black font-medium'
                : 'text-[#464646] hover:text-black hover:bg-black/[0.02]',
              'text-[13px] tracking-tight'
            )}
          >
            <Grid3X3 className={cn(
              'transition-colors h-[18px] w-[18px]',
              showWidgetPanel ? 'text-black' : 'text-[#646464] group-hover:text-black'
            )} />
            <span>Widgets</span>
          </button>
        </nav>
        
        {/* Widget Panel */}
        {showWidgetPanel && (
          <WidgetPanel onClose={() => setShowWidgetPanel(false)} />
        )}
        <div className="p-5 mt-auto border-t border-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-700 font-medium text-sm border border-neutral-400">
              <span>WU</span>
            </div>
            <div>
              <p className="text-sm font-playfair-display font-semibold text-neutral-800">Wonder User</p>
              <p className="text-xs text-neutral-600">user@wonder.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
