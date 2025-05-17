"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, CreditCard, Shield, Clock, Settings, Headphones } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: "Exclusive Destinations",
    description: "Discover unique and extraordinary destinations that are carefully curated for unforgettable experiences."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Secure Payments",
    description: "Book with confidence using our secure and transparent payment system with no hidden fees."
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Travel Insurance",
    description: "Travel worry-free with our comprehensive insurance options to protect your journey."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Last-Minute Deals",
    description: "Take advantage of special offers and last-minute deals for spontaneous adventures."
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Customizable Packages",
    description: "Create your perfect trip with our flexible and customizable travel packages and options."
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you during your travels."
  }
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

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose WonderReserve
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide a seamless travel booking experience with premium features designed to make your journey extraordinary.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}