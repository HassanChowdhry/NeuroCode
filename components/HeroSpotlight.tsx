"use client"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import { APP_NAME } from "./APP_NAMEConfig"

export function HeroSpotlight() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-[70vh] px-4 py-24">
      {/* Left: Text */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 leading-tight drop-shadow-lg"
          >
            Practice coding smarter with <span className="text-primary-600">{APP_NAME}</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: shouldReduceMotion ? 0 : 0.6 }}
            className="text-2xl md:text-3xl text-gray-700 mb-10 max-w-xl font-medium"
          >
            AI-powered practice, personalized learning, real-time feedback.
          </motion.p>
          <Button
            size="lg"
            className="w-full md:w-auto text-lg px-8 py-4 shadow-xl"
            asChild
          >
            <a href="/signup">Get Started Free</a>
          </Button>
        </div>
      </div>
      {/* Right: Hero Image/Spotlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: shouldReduceMotion ? 0 : 0.7 }}
        className="flex-1 flex items-center justify-center"
      >
        {/* TODO: Replace with actual asset */}
        <img
          src="/media/hero-demo.webp"
          alt="AI Coding Demo"
          className="w-full max-w-lg rounded-xl shadow-2xl bg-white border-2 border-primary-100"
          loading="eager"
        />
      </motion.div>
      {/* TODO: Add animated background/spotlight here */}
    </section>
  )
} 