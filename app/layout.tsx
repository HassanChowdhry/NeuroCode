import React from 'react'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NeuroCode - AI-Powered Coding Practice Platform',
    template: '%s | NeuroCode'
  },
  description: 'Master coding with AI-powered practice problems, personalized learning paths, and real-time feedback. Practice algorithms, data structures, and system design with intelligent tutoring.',
  keywords: ['coding practice', 'algorithm problems', 'data structures', 'system design', 'AI tutoring', 'programming education', 'competitive programming'],
  authors: [{ name: 'NeuroCode Team' }],
  creator: 'NeuroCode',
  publisher: 'NeuroCode',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://neurocode.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neurocode.dev',
    title: 'NeuroCode - AI-Powered Coding Practice Platform',
    description: 'Master coding with AI-powered practice problems, personalized learning paths, and real-time feedback.',
    siteName: 'NeuroCode',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NeuroCode - AI-Powered Coding Practice Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroCode - AI-Powered Coding Practice Platform',
    description: 'Master coding with AI-powered practice problems, personalized learning paths, and real-time feedback.',
    images: ['/og-image.png'],
    creator: '@neurocode',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
} 