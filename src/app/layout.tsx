import type { Metadata } from 'next';
// 1. Import font Plus Jakarta Sans dari Google Fonts bawaan Next.js
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

// 2. Konfigurasi font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta', // Membuat custom CSS variable
});

export const metadata: Metadata = {
  title: 'BizTrack | Solusi Digital UMKM',
  description: 'Digital agency terpercaya untuk UMKM Indonesia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Pasang font ke tag HTML
    <html lang="id" className={`${jakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        {children}
      </body>
    </html>
  );
}