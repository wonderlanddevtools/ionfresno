"use client";

import { Navbar } from '@/components/navbar'; // Assuming Navbar should be present
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Added for navigation

const SignInPage = () => {
  const backgroundImageUrl = "https://s3.amazonaws.com/a.storyblok.com/f/116532/1334x888/cbd3f63140/the-chiltern-firehouse-london.webp";
  const router = useRouter(); // Added for navigation

  const handleSignIn = () => { // Added for navigation
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main 
        className="flex-grow flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover', // Reverted to 'cover'
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" /> {/* Overlay */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl"
        >
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-white">
              Sign In
            </h1>
          </div>

          <div className="space-y-6"> {/* Changed form to div */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                // required // Removed required
                className="mt-1 block w-full bg-transparent border-b border-neutral-300/50 text-white placeholder-neutral-400 focus:border-white focus:ring-0 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                // required // Removed required
                className="mt-1 block w-full bg-transparent border-b border-neutral-300/50 text-white placeholder-neutral-400 focus:border-white focus:ring-0 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="#" className="font-medium text-neutral-300 hover:text-white">
                Forgot your password?
              </Link>
            </div>

            <div>
              <Button
                type="button" // Changed to button
                onClick={handleSignIn} // Added onClick handler
                className="w-full h-12 text-base font-medium rounded-md bg-white/90 hover:bg-white text-neutral-800 shadow-lg"
              >
                Sign In
              </Button>
            </div>
          </div> {/* Changed form to div */}

          <p className="text-center text-sm text-neutral-300">
            Do not have an account?{' '} {/* Changed "Don't" to "Do not" */}
            <Link href="#" className="font-medium hover:text-white hover:underline">
              Inquire
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default SignInPage;
