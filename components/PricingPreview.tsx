import { Button } from '@/components/ui/button'
import { APP_NAME } from './APP_NAMEConfig'

export interface PricingTier {
  name: string
  price: string
  features: string[]
  cta: string
  highlight?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Unlimited practice problems",
      "AI recommendations",
      "Basic study plans"
    ],
    cta: "Start Free"
  },
  {
    name: "Pro",
    price: "$12/mo",
    features: [
      "All Free features",
      "Advanced AI Tutor",
      "Personalized study plans",
      "Priority support"
    ],
    cta: "Go Pro",
    highlight: true
  }
  // TODO: Add more tiers if needed
]

export function PricingPreview() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">Pricing</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {pricingTiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`bg-card rounded-xl p-8 shadow-base flex-1 flex flex-col items-center border-2 ${tier.highlight ? 'border-primary-500' : 'border-transparent'}`}
            >
              <h3 className="text-xl font-semibold mb-2 text-foreground">{tier.name}</h3>
              <div className="text-3xl font-bold mb-4 text-primary-500">{tier.price}</div>
              <ul className="mb-6 space-y-2">
                {tier.features.map((f, j) => (
                  <li key={j} className="text-muted-foreground flex items-center gap-2">
                    <span className="text-primary-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="w-full"
                asChild
              >
                <a href="/signup">{tier.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 