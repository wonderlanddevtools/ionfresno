"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutGrid, 
  CircleDollarSign, 
  CreditCard, 
  LineChart, 
  UserCog, 
  Building, 
  ScrollText, 
  Grid3X3
} from 'lucide-react';
import { WidgetPanel } from './WidgetPanel';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/dashboard/reservations', label: 'Transactions', icon: CircleDollarSign },
  { href: '/dashboard/bill-pay', label: 'Bill Pay', icon: CreditCard },
  { href: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
  { href: '/dashboard/account', label: 'Account', icon: UserCog },
  { href: '/dashboard/settings', label: 'WonderFlex Capital', icon: Building },
  { href: '/dashboard/accounting', label: 'Accounting', icon: ScrollText },
];

export function AppleSidenav() {
  const pathname = usePathname();
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Apple-style glass container with high translucency */}
      <div 
        className="h-full w-full rounded-[22px] flex flex-col overflow-hidden relative"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.06)',  /* Ultra-low opacity for maximum translucency */
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          boxShadow: 'rgba(0, 0, 0, 0.06) 0px 10px 30px',
        }}
      >
        {/* Apple-style subtle border overlay */}
        <div 
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          style={{
            border: '0.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 0.5px 0 0 rgba(255, 255, 255, 0.3)',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0) 8%)'  
          }}
        />
        
        {/* Content */}
        <div className="p-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-[1.4rem] text-white whitespace-nowrap" style={{ fontFamily: "'AS Chateau', serif", textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              Wonderland Studio
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-white/15 text-white font-medium' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'}
                  text-[13px] tracking-tight
                `}
              >
                <item.icon 
                  className={`h-[18px] w-[18px] ${
                    isActive ? 'text-white' : 'text-white/75'
                  }`}
                />
                <span style={{ textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>{item.label}</span>
              </Link>
            );
          })}
          
          {/* Widgets Button */}
          <button
            type="button"
            onClick={() => setShowWidgetPanel(!showWidgetPanel)}
            className={`
              flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200
              ${showWidgetPanel 
                ? 'bg-white/15 text-white font-medium' 
                : 'text-white/80 hover:text-white hover:bg-white/10'}
              text-[13px] tracking-tight w-full
            `}
          >
            <Grid3X3 
              className={`h-[18px] w-[18px] ${
                showWidgetPanel ? 'text-white' : 'text-white/75'
              }`}
            />
            <span style={{ textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>Widgets</span>
          </button>
        </nav>
        
        {/* Widget Panel */}
        {showWidgetPanel && (
          <WidgetPanel onClose={() => setShowWidgetPanel(false)} />
        )}
        
        <div className="p-5 mt-auto border-t border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-medium text-sm shadow-sm">
              <span>WU</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>Wonder User</p>
              <p className="text-xs text-white/70">user@wonder.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}