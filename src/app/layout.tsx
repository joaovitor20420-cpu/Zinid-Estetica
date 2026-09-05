import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://zinid-estetica.vercel.app'),
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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zinid-estetica.vercel.app',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoBodyShop",
              "name": "Zinid Estética Automotiva",
              "image": "https://zinid-estetica.vercel.app/1b0cad2c-4f8d-4a3f-ae8a-c003a9bf4400.png",
              "@id": "https://zinid-estetica.vercel.app",
              "url": "https://zinid-estetica.vercel.app",
              "telephone": "+5531995998390",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Fausto Ribeiro da Silva, 1257 - Loja 4, Bandeirinhas",
                "addressLocality": "Betim",
                "addressRegion": "MG",
                "postalCode": "32654-805",
                "addressCountry": "BR"
              },
              "sameAs": [
                "https://www.google.com/search?q=Zinid+Estética+Automotiva"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased bg-zinid-black text-white min-h-screen flex flex-col font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
