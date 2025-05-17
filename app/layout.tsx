import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeTransitionProvider } from '@/components/theme-transition-provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', 
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '700'], // Specify weights you intend to use
});

export const metadata: Metadata = {
  title: 'WonderReserve | Discover Extraordinary Destinations',
  description: 'Book your dream vacation with WonderReserve. Discover extraordinary destinations, exclusive accommodations, and unforgettable experiences.',
  keywords: 'travel booking, luxury travel, vacation packages, hotel reservations, flight booking',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning> {/* REMOVED TEMPORARY 'dark' CLASS */}
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeTransitionProvider>
            {children}
          </ThemeTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
