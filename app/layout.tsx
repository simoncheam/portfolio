import { Navbar } from '@/components/navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simon Cheam - Full Stack Developer & Cloud Engineer',
  description: 'Portfolio of Simon Cheam, showcasing full stack development and cloud engineering projects',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className='max-w-6xl mx-auto px-4 w-full'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
