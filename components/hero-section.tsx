"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { scrollY } = useScroll();
  // Parallax for the main content (fade and scale out)
  const contentOpacity = useTransform(scrollY, [0, 300, 400], [1, 1, 0]);
  const contentScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  // Parallax for the background image (moves up slower than scroll)
  const backgroundY = useTransform(scrollY, [0, 800], ['0%', '-20%']);

  const heroImageUrl = "https://media.cntraveler.com/photos/656e52f672d80b14064e9c8a/16:9/w_2560%2Cc_limit/Chateau%2520Marmont_CM_Rooms_PH29_piano_JRothenberg_vlores.jpg";

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY,
        }}
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-0" /> {/* Changed from bg-black/30 to bg-black/40 */}

      {/* Content Container */}
      <div className="min-h-screen flex items-center justify-center container px-8 pt-24 md:pt-32 pb-40 md:pb-48 relative z-10"> {/* Adjusted vertical padding to shift content up slightly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="max-w-[90rem] mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <motion.h1 
              className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-serif font-bold tracking-tighter mb-8 leading-[0.85] text-white" // Changed back to font-serif, font-bold
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              WonderReserve
            </motion.h1>
          </motion.div>
          
          {/* Tagline removed */}
          
          {/* Buttons container removed from HeroSection */}
        </motion.div>
      </div>

      {/* Old animated background elements commented out/removed */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 40, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-500/5 via-transparent to-transparent rounded-full blur-3xl opacity-70"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/5 via-transparent to-transparent rounded-full blur-3xl opacity-70"
        />
      </div> */}
    </section>
  );
}
