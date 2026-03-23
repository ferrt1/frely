import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Frely — Tu negocio atiende solo',
  description: 'Automatizá las respuestas de WhatsApp, Instagram y Telegram con IA. Sin contratar a nadie. Sin perder clientes. Atendé 24/7.',
  keywords: ['whatsapp', 'automatización', 'chatbot', 'inteligencia artificial', 'negocio', 'argentina', 'atención al cliente', 'frely'],
  authors: [{ name: 'Frely' }],
  openGraph: {
    title: 'Frely — Tu negocio atiende solo',
    description: 'Automatizá las respuestas de WhatsApp, Instagram y Telegram con IA. Atendé 24/7 sin contratar a nadie.',
    url: 'https://frely.com.ar',
    siteName: 'Frely',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Frely - tu negocio atiende solo' }],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frely — Tu negocio atiende solo',
    description: 'Automatizá las respuestas de WhatsApp, Instagram y Telegram con IA.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
