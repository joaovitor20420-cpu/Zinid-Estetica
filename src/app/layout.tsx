import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Zinid Estética Automotiva | Betim - MG',
  description: 'Zinid Estética Automotiva em Betim, MG. Cuidado, detalhamento e acabamento para o seu veículo.',
  keywords: [
    'estética automotiva Betim',
    'estética automotiva em Betim MG',
    'detalhamento automotivo Betim',
    'limpeza automotiva Betim',
    'Zinid Estética Automotiva'
  ],
  openGraph: {
    title: 'Zinid Estética Automotiva | Betim - MG',
    description: 'Zinid Estética Automotiva em Betim, MG. Cuidado, detalhamento e acabamento para o seu veículo.',
    url: 'https://zinid.com.br',
    siteName: 'Zinid Estética Automotiva',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="antialiased bg-zinid-black text-white min-h-screen flex flex-col font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
