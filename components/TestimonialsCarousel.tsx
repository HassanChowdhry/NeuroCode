"use client"
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { APP_NAME } from './APP_NAMEConfig'

export interface Testimonial {
  name: string
  avatar: string
  quote: string
  rating: number
  role?: string
}

const testimonials: Testimonial[] = [
  {
    name: "Alex P.",
    avatar: "/media/avatar1.png",
    quote: "The AI tutor helped me finally understand recursion. {APP_NAME} is a game changer!",
    rating: 5,
    role: "Student"
  },
  {
    name: "Jamie L.",
    avatar: "/media/avatar2.png",
    quote: "I love the personalized study plans. My progress has never been this fast.",
    rating: 5,
    role: "Bootcamp Grad"
  },
  // TODO: Add more testimonials
]

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">What learners say</h2>
        <div className="relative w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="bg-card rounded-xl p-8 shadow-base flex flex-col items-center"
            >
              <img src={t.avatar} alt={t.name} className="h-16 w-16 rounded-full mb-4" />
              <blockquote className="text-lg text-foreground mb-2">“{t.quote.replace('{APP_NAME}', APP_NAME)}”</blockquote>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} aria-label="star" className="text-yellow-400">★</span>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">{t.name}{t.role && `, ${t.role}`}</div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`h-2 w-2 rounded-full ${i === index ? 'bg-primary-500' : 'bg-muted-foreground/30'}`}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 