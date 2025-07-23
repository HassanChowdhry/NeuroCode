import { HeroSpotlight } from '@/components/HeroSpotlight'
import { FeatureBento } from '@/components/FeatureBento'
import { HowItWorks } from '@/components/HowItWorks'
import { ComparisonTable } from '@/components/ComparisonTable'
import { CTABanner } from '@/components/CTABanner'
import { Footer } from '@/components/Footer'

export default function MarketingPage() {
  return (
    <div className="">
      <div className="">
        <HeroSpotlight />
        <FeatureBento />
        <HowItWorks />
        <ComparisonTable />
        <CTABanner />
        <Footer />
      </div>
    </div>
  )
} 