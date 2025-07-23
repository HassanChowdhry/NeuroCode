"use client"
import { motion, useReducedMotion } from 'framer-motion'
export function AIInAction() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="py-16 bg-gradient-to-b from-primary-50/60 to-background">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">AI in Action</h2>
        <motion.div
          className="w-full max-w-2xl bg-card rounded-xl p-6 shadow-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
        >
          {/* TODO: Insert animated code block or chat UI here */}
          <pre className="text-sm md:text-base font-mono text-foreground bg-muted/60 rounded p-4 overflow-x-auto">
{`// Example: AI Tutor
User: "Why is my code failing this test case?"
AI: "Check your loop bounds. Try using '<=' instead of '<' on line 12."`}
          </pre>
        </motion.div>
      </div>
    </section>
  )
} 