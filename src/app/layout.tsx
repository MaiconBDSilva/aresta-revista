import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Newsreader, Plus_Jakarta_Sans, Lora } from 'next/font/google';
import './globals.css';
import { HeaderPortal } from '@/components/layout/HeaderPortal';
import { HeaderFrostedGlass } from '@/components/layout/HeaderFrostedGlass';
import { FooterEditorial } from '@/components/layout/FooterEditorial';

const svetze = localFont({
  src: '../../public/fonts/Svetze.otf',
  variable: '--font-svetze',
  weight: '400',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'aresta. | Revista de Ensaios & Colunas Contemporâneas',
    template: '%s | aresta.',
  },
  description:
    'Portal editorial independente para publicação e leitura de colunas de opinião, ensaios culturais e crônicas autorais.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#FBFBF9',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${svetze.variable} ${newsreader.variable} ${plusJakarta.variable} ${lora.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        {/* Menu Flutuante Fixo (Frosted Glass real: bg-white/30 backdrop-blur-md border-white/20 shadow-lg) */}
        <HeaderFrostedGlass />

        {/* Header Estático de Topo (Logo grande em Svetze + Clone do Menu embaixo) */}
        <HeaderPortal />

        <main className="main-content-layout flex-1">
          {children}
        </main>
        <FooterEditorial />
      </body>
    </html>
  );
}
