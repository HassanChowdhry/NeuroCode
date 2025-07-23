"use client"
import { Button } from '@/components/ui/button'
import { motion, useReducedMotion } from 'framer-motion'
import { APP_NAME } from './APP_NAMEConfig'

export function LiveDemoStrip() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
        >
          <video
            src="/media/live-demo.mp4"
            poster="/media/hero-demo.webp"
            controls
            className="rounded-xl shadow-lg w-full max-w-xl"
            preload="none"
          />
        </motion.div>
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">See {APP_NAME} in action</h2>
          <p className="text-muted-foreground mb-6">Experience instant feedback and AI-powered learning. Try a live demo now.</p>
          <Button asChild size="lg">
            <a href="/signup">Try Free Demo</a>
          </Button>
        </div>
      </div>
    </section>
  )
} 