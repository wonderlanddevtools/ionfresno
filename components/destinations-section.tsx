"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type Destination = {
  id: number;
  name: string;
  location: string;
  image: string;
  price: string;
};

const destinations: Destination[] = [
  {
    id: 1,
    name: "Paris",
    location: "France",
    image: "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "From $699",
  },
  {
    id: 2,
    name: "London",
    location: "United Kingdom",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "From $749",
  },
  {
    id: 3,
    name: "Tokyo",
    location: "Japan",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "From $999",
  },
  {
    id: 4,
    name: "New York",
    location: "United States",
    image: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "From $849",
  },
  {
    id: 5,
    name: "Bali",
    location: "Indonesia",
    image: "https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "From $899",
  },
  {
    id: 6,
    name: "Sydney",
    location: "Australia",
    image: "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "From $1099",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <motion.div variants={item}>
      <Card className="group overflow-hidden rounded-xl border-none shadow-md hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-xl font-bold">{destination.name}</h3>
              <p className="text-sm text-gray-200">{destination.location}</p>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-medium">
              {destination.price}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function DestinationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section id="destinations" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover our most sought-after destinations around the world. Explore unique places and create unforgettable memories.
            </p>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex items-center mt-4 md:mt-0">
            View All Destinations
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
        
        <motion.div 
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </motion.div>
        
        <div className="mt-12 flex justify-center md:hidden">
          <Button variant="outline" className="inline-flex items-center">
            View All Destinations
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}