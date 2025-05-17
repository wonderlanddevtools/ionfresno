import { HeroSection } from '@/components/hero-section';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
    </main>
  );
}
