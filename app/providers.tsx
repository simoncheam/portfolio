'use client';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </>
  );
}
export default Providers;
