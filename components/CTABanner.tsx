import { Button } from '@/components/ui/button'
import { APP_NAME } from './APP_NAMEConfig'
export function CTABanner() {
  return (
    <section className="py-12 bg-gradient-to-r from-primary-500 to-primary-700 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to practice smarter?</h2>
      <p className="mb-6">Join {APP_NAME} and unlock your coding potential.</p>
      <Button size="lg" variant="secondary" asChild>
        <a href="/signup">Sign Up Free</a>
      </Button>
    </section>
  )
} 