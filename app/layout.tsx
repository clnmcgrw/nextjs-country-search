import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import Header from '@/components/shared/header';
import { ThemeToggleModes } from '@/types';
import '../styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Where in the world? // Information about the world's countries`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // theme/mode value stored in cookie to avoid flash of light mode on page reload
  const allCookies = cookies();
  const themeCookie = allCookies.get('theme');
  const themeCookieValue = themeCookie ? themeCookie.value : null;

  return (
    <html lang="en" data-theme={themeCookieValue}>
      <body className={inter.className}>
        <Header theme={themeCookieValue as ThemeToggleModes | null} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
