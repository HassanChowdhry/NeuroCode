import { APP_NAME } from '@/components/APP_NAMEConfig'
import { HeroSpotlight } from '@/components/HeroSpotlight'
import { LogosStrip } from '@/components/LogosStrip'
import { FeatureBento } from '@/components/FeatureBento'
import { LiveDemoStrip } from '@/components/LiveDemoStrip'
import { HowItWorks } from '@/components/HowItWorks'
import { AIInAction } from '@/components/AIInAction'
import { ComparisonTable } from '@/components/ComparisonTable'
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel'
import { PricingPreview } from '@/components/PricingPreview'
import { CTABanner } from '@/components/CTABanner'
import { Footer } from '@/components/Footer'

export default function MarketingPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4">
      <div className="space-y-24">
        <HeroSpotlight />
        <LogosStrip />
        <FeatureBento />
        <LiveDemoStrip />
        <HowItWorks />
        <AIInAction />
        <ComparisonTable />
        <TestimonialsCarousel />
        <PricingPreview />
        <CTABanner />
        <Footer />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Practice coding smarter with AI | NeuroCode',
  description: 'AI-powered coding practice platform. Personalized recommendations, instant feedback, and secure code sandbox. Try NeuroCode free.',
  openGraph: {
    title: 'Practice coding smarter with AI | NeuroCode',
    description: 'AI-powered coding practice platform. Personalized recommendations, instant feedback, and secure code sandbox.',
    url: 'https://yourdomain.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NeuroCode' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Practice coding smarter with AI | NeuroCode',
    description: 'AI-powered coding practice platform. Personalized recommendations, instant feedback, and secure code sandbox.',
    images: ['/og-image.png']
  }
} 