import { SessionProvider } from '@/hooks';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

import { Toaster } from '../components';

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider attribute="class" enableSystem defaultTheme="dark" disableTransitionOnChange>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </NextThemeProvider>
  );
}
