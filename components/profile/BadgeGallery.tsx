"use client"
import * as React from "react"
import { useState } from "react"
import { Badge as UIBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Lock, Share2, Copy, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface BadgeInfo {
  id: string
  label: string
  description: string
  requirement: string
  earned: boolean
  progress?: { current: number; total: number }
  icon?: React.ReactNode
  newlyEarned?: boolean
}

export interface BadgeGalleryProps {
  badges: BadgeInfo[]
  loading?: boolean
  error?: string
}

export function BadgeGallery({ badges, loading, error }: BadgeGalleryProps) {
  const [shareBadge, setShareBadge] = useState<BadgeInfo | null>(null)
  const [copied, setCopied] = useState(false)

  function handleCopyLink(badge: BadgeInfo) {
    navigator.clipboard.writeText(`${window.location.origin}/profile/badges/${badge.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  // Placeholder for image export
  function handleExportImage(badge: BadgeInfo) {
    alert('Image export coming soon!')
  }

  return (
    <section className="bg-card rounded-xl p-6 shadow space-y-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">Badges</h2>
      {loading ? (
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-20 h-20 bg-muted animate-pulse rounded-full" />)}
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center gap-2 relative group">
              <AnimatePresence>
                {badge.newlyEarned && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    className="absolute -top-2 -right-2 z-10"
                  >
                    <CheckCircle className="h-6 w-6 text-success-500 animate-bounce" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="relative group">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl border-2 ${badge.earned ? 'border-success-500 bg-success-50' : 'border-muted bg-muted'} transition-colors`}
                  tabIndex={0}
                  aria-label={badge.label}
                  title={badge.label}
                >
                  {badge.icon || (badge.earned ? <CheckCircle className="h-10 w-10 text-success-500" /> : <Lock className="h-10 w-10 text-muted-foreground" />)}
                </div>
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-20 hidden group-hover:block bg-background border rounded shadow p-2 w-56 text-xs text-foreground">
                  <div className="font-semibold mb-1">{badge.label}</div>
                  <div className="mb-1 text-muted-foreground">{badge.requirement}</div>
                  {badge.progress && (
                    <div className="w-full bg-muted rounded h-2 mt-2">
                      <div className="bg-primary-500 h-2 rounded" style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }} />
                    </div>
                  )}
                  {badge.progress && (
                    <div className="text-xs mt-1">{badge.progress.current}/{badge.progress.total}</div>
                  )}
                </div>
              </div>
              <div className="text-xs text-center mt-1 max-w-[5rem] truncate" title={badge.label}>{badge.label}</div>
              <div className="flex gap-1 mt-1">
                {badge.earned && (
                  <Button size="sm" variant="ghost" onClick={() => setShareBadge(badge)} aria-label="Share badge"><Share2 className="h-4 w-4" /></Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Share Modal */}
      {shareBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card rounded-xl p-6 shadow-lg w-full max-w-xs flex flex-col items-center gap-4 relative">
            <button className="absolute top-2 right-2 text-muted-foreground" onClick={() => setShareBadge(null)} aria-label="Close">✕</button>
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-success-50 border-2 border-success-500">
              {shareBadge.icon || <CheckCircle className="h-12 w-12 text-success-500" />}
            </div>
            <div className="font-semibold text-lg text-center">{shareBadge.label}</div>
            <div className="text-xs text-muted-foreground text-center mb-2">{shareBadge.requirement}</div>
            <div className="flex gap-2 w-full">
              <Button size="sm" className="flex-1" onClick={() => handleCopyLink(shareBadge)}><Copy className="h-4 w-4 mr-1" />{copied ? 'Copied!' : 'Copy Link'}</Button>
              <Button size="sm" className="flex-1" onClick={() => handleExportImage(shareBadge)}><ImageIcon className="h-4 w-4 mr-1" />Export Image</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
} 