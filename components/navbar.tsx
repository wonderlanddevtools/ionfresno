"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // <AnimatePresence>
      <header 
        // initial={{ y: -20, opacity: 0 }}
        // animate={{ y: 0, opacity: 1 }}
        // transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-700",
          isScrolled ? "glass-morphism" : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-8 h-28 flex items-center justify-between">
          <div>
            <Link 
              href="/" 
              className="text-lg font-medium tracking-tight text-white hover:text-neutral-200 hover-lift"
            >
              WonderPay
            </Link>
          </div>

          <div className="flex items-center space-x-4"> {/* Reduced space-x-8 to space-x-4 */}
            <div>
              <Link href="/auth/signin" passHref>
                <Button 
                  variant="ghost" 
                  className="text-sm font-medium text-white hover:text-neutral-200 hover:bg-white/10 rounded-full px-6 h-10" // Updated "Sign In" style
                >
                  Sign In
                </Button>
              </Link>
            </div>
            <div>
              <Button 
                variant="link" // Explicitly set to link to remove default button padding/bg
                className="text-sm font-medium text-white hover:text-neutral-200 px-0" // Removed bg, border, shadow, adjusted padding
              >
                Learn More
              </Button>
            </div>
          </div>
        </nav>
      </header>
    // </AnimatePresence>
  );
}