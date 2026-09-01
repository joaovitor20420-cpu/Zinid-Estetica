import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased bg-zinid-black text-white min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
