"use client"
import { motion, useReducedMotion } from 'framer-motion'
import { APP_NAME } from './APP_NAMEConfig'
import { Badge } from '@/components/ui/badge'
import { BrainCog, Bot, BookOpen, ShieldCheck } from 'lucide-react'

export interface FeatureCard {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  analyticsKey: string
}

export const features: FeatureCard[] = [
  {
    icon: <BrainCog className="h-8 w-8 text-primary-500" />,
    title: 'Adaptive Recommendations',
    description: 'Get personalized problem suggestions with our Multi-Contextual Predictor (MCP).',
    badge: 'AI-Powered',
    analyticsKey: 'feature_mcp'
  },
  {
    icon: <Bot className="h-8 w-8 text-primary-500" />,
    title: 'AI Tutor',
    description: 'Stuck? Get hints, explanations, and step-by-step help instantly.',
    badge: '24/7',
    analyticsKey: 'feature_tutor'
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary-500" />,
    title: 'Study Plans',
    description: 'Follow guided learning paths tailored to your goals.',
    badge: 'Personalized',
    analyticsKey: 'feature_studyplans'
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary-500" />,
    title: 'Secure Code Sandbox',
    description: 'Run code safely in the browser with Judge0 integration.',
    badge: 'Safe',
    analyticsKey: 'feature_sandbox'
  }
]

export function FeatureBento() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              whileHover={shouldReduceMotion ? {} : { scale: 1.03, boxShadow: '0 8px 32px rgba(14,165,233,0.10)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-xl p-8 shadow-lg flex flex-col gap-3 cursor-pointer border border-gray-100 hover:shadow-xl focus-within:shadow-xl transition"
              tabIndex={0}
              aria-label={feature.title}
            >
              <div className="flex items-center gap-3 mb-2">
                {feature.icon}
                {feature.badge && <Badge variant="secondary">{feature.badge}</Badge>}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 