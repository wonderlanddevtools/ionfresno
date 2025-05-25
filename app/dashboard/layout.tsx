"use client";

import { useState, useEffect, useCallback } from 'react';
import { AppleSidenav } from '@/components/apple-sidenav';
import { Menu } from 'lucide-react';
import { WidgetProvider } from '@/components/dashboard/WidgetManager';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarVisible, setSidebarVisible] = useState(false); // Initially hidden
  
  // Toggle sidebar visibility using useCallback to avoid recreation on each render
  const toggleSidebar = useCallback(() => {
    setSidebarVisible(prev => !prev);
  }, []);
  
  // Handle keyboard shortcut (⌘+Option+D) for toggling sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command (or Ctrl) + Option (or Alt) + D
      if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'd') {
        e.preventDefault();
        toggleSidebar();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);
  return (
    <WidgetProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Main content with Chateau Marmont background - placed first so it's behind everything */}
        <div 
          className="fixed inset-0"
          style={{
            backgroundImage: `url('https://media.cntraveler.com/photos/656e52f715361ff9910e32e8/16:9/w_2560,c_limit/Chateau%20Marmont_CM_eastexterior_JFRothenberg.vlores.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
        >
          {/* Dark overlay for better readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      
      {/* Toggle button for sidebar */}
      <button 
        onClick={toggleSidebar}
        className={`fixed top-24 z-50 rounded-full p-2 bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 shadow-lg hover:bg-white/20
          ${sidebarVisible ? 'left-[256px]' : 'left-4'}`}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>
      
      {/* Animated sidebar container - smaller and positioned further down */}
      <div 
        className={`w-64 h-[calc(100%-72px)] fixed top-20 z-40 p-3 bg-transparent transition-all duration-300 ease-in-out transform
          ${sidebarVisible ? 'left-4' : '-left-64'}`}
      >
        <AppleSidenav />
      </div>
      
      {/* Reserved space for macOS-style top bar */}
      <div className="h-16 w-full fixed top-0 left-0 z-30" />
      
      {/* Main content area with responsive margin and padding for top bar */}
      <main 
        className={`flex-1 overflow-y-auto relative z-10 transition-all duration-300 ease-in-out pt-20
          ${sidebarVisible ? 'ml-[280px]' : 'ml-4'}`}
      >
        <div className="p-6 md:p-8 lg:p-10"> 
          {children}
        </div>
      </main>
      </div>
    </WidgetProvider>
  );
}
