import { HeroSpotlight } from '@/components/HeroSpotlight'
import { FeatureBento } from '@/components/FeatureBento'
import { CTABanner } from '@/components/CTABanner'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export default function MarketingPage() {
  return (
    <>
      <Navbar />
      <HeroSpotlight />
      <FeatureBento />
      <CTABanner />
      <Footer />
    </>
  )
} 