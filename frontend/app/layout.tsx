
import type { Metadata } from 'next';
import { Kanit, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { designTokens } from '@/lib/design-tokens';
import { AppProviders } from '../providers';

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-kanit',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'VibeCut AI - Video Editor SaaS',
  description: 'AI-powered video editing with 4-agent pipeline',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
      </head>
      <body className="bg-app min-h-screen">
          <AppProviders>
            {children}
          </AppProviders>
        </body>
    </html>
  );
}