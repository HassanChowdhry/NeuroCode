"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function CTABanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-12 text-white"
        >
          <Sparkles className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Coding Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using AI to accelerate their learning and land their dream
            jobs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
