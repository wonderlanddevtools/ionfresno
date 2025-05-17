"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface DraggableWidgetProps {
  id: string;
  defaultPosition?: { x: number; y: number };
  onRemove?: (id: string) => void;
  children: React.ReactNode;
}

export function DraggableWidget({
  id,
  defaultPosition = { x: 20, y: 20 },
  onRemove,
  children
}: DraggableWidgetProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [editMode, setEditMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const originalPositionRef = useRef(defaultPosition);

  // Set up document-level event listeners for edit mode
  useEffect(() => {
    if (!editMode) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setEditMode(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editMode]);

  // Handle document-level mouse events when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      // Calculate new position based on the original position and drag distance
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      setPosition({
        x: originalPositionRef.current.x + dx,
        y: originalPositionRef.current.y + dy
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Update the reference position for future drags
      originalPositionRef.current = position;
    };

    // Add document-level handlers for smooth dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  // Start long press timer
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only handle primary mouse button (left click)
    if (e.button !== 0) return;

    // Store the current position for reference
    originalPositionRef.current = position;

    // Store the mouse coordinates at the start of the interaction
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    // Cancel any existing timer
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    // Set a timer for long press to enter edit mode (jiggle mode)
    if (!editMode) {
      longPressTimeoutRef.current = setTimeout(() => {
        setEditMode(true);
      }, 800); // 800ms for long press detection (matches iOS/macOS)
    } else {
      // If already in edit mode, prepare for dragging
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    // Cancel the long press timer if they release before timeout
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
    
    // If we're not continuing to drag in edit mode, update the reference position
    if (!editMode) {
      originalPositionRef.current = position;
    }
  };

  // Handle short movements that shouldn't trigger a drag
  const handleMouseMove = (e: React.MouseEvent) => {
    // If there's significant movement while pressing, cancel the edit mode timer
    if (longPressTimeoutRef.current) {
      const dx = Math.abs(e.clientX - dragStartRef.current.x);
      const dy = Math.abs(e.clientY - dragStartRef.current.y);
      
      // If moved more than 5px in any direction while pressing, cancel long press
      if (dx > 5 || dy > 5) {
        clearTimeout(longPressTimeoutRef.current);
        longPressTimeoutRef.current = null;
        
        // If already in edit mode, start dragging
        if (editMode) {
          setIsDragging(true);
        }
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(id);
    }
  };

  return (
    <>
      {/* Add macOS-style jiggle animation when in edit mode */}
      {editMode && (
        <style jsx global>{`
          @keyframes widget-jiggle {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(-1deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(1deg); }
            100% { transform: rotate(0deg); }
          }
        `}</style>
      )}
      
      <div
        ref={widgetRef}
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: editMode || isDragging ? 50 : 10,
          cursor: editMode ? 'grab' : 'default',
          animation: editMode && !isDragging ? 'widget-jiggle 0.7s infinite ease-in-out' : 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* macOS red close button */}
        {editMode && (
          <div 
            className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-red-500 shadow-md flex items-center justify-center cursor-pointer hover:brightness-110 z-10"
            onClick={handleRemove}
          >
            <X className="w-3 h-3 text-white stroke-[3]" />
          </div>
        )}

        {/* Widget content with subtly highlighted border in edit mode */}
        <div 
          className={`rounded-xl overflow-hidden transition-shadow duration-200 ${editMode ? 'shadow-[0_0_0_2px_rgba(255,255,255,0.3)]' : ''}`}
          style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
