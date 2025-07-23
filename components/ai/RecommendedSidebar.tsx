// Add this at the top of the file to extend the Window interface for analytics
declare global {
  interface Window {
    analytics?: { track?: (event: string, props?: any) => void }
  }
}

"use client"
import * as React from "react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { ContributionHeatmap, DayContribution } from "@/components/dashboard/ContributionHeatmap"

export interface RecommendedProblem {
  id: string
  title: string
  difficulty: string
  tags: string[]
  reason: string
}

export interface RecommendedSidebarProps {
  problems: RecommendedProblem[]
  loading?: boolean
  error?: string
  onFeedback: (problemId: string, action: 'accept' | 'skip' | 'not_relevant') => Promise<void>
  maxCount?: number
}

type OptimisticAction = 'accepted' | 'skipped' | 'not_relevant'
const actionToOptimistic: Record<'accept' | 'skip' | 'not_relevant', OptimisticAction> = {
  accept: 'accepted',
  skip: 'skipped',
  not_relevant: 'not_relevant',
}

export function RecommendedSidebar({ problems, loading, error, onFeedback, maxCount = 5 }: RecommendedSidebarProps) {
  const [optimistic, setOptimistic] = React.useState<{ [id: string]: OptimisticAction } | null>(null)
  const [submitting, setSubmitting] = React.useState<string | null>(null)
  const [localError, setLocalError] = React.useState<string | null>(null)

  // Optimistic state: hide problems that have been acted on
  const visibleProblems = React.useMemo(() => {
    if (!optimistic) return problems.slice(0, maxCount)
    return problems.filter(p => !optimistic[p.id]).slice(0, maxCount)
  }, [problems, optimistic, maxCount])

  async function handleFeedback(id: string, action: 'accept' | 'skip' | 'not_relevant') {
    setSubmitting(id)
    setOptimistic(prev => ({ ...(prev || {}), [id]: actionToOptimistic[action] }))
    setLocalError(null)
    try {
      window.analytics?.track?.('recommendation_feedback', { problemId: id, action })
      await onFeedback(id, action)
    } catch (e: any) {
      setLocalError(e.message || 'Failed to send feedback')
      setOptimistic(prev => {
        const copy = { ...(prev || {}) }
        delete copy[id]
        return copy
      })
    } finally {
      setSubmitting(null)
    }
  }

  return (
    <aside className="w-full max-w-xs bg-background border-l h-full flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b">
        <Sparkles className="h-5 w-5 text-primary-500" />
        <span className="font-semibold text-lg">Recommended</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && Array.from({ length: maxCount }).map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded animate-pulse" />
        ))}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {localError && <div className="text-red-600 text-sm">{localError}</div>}
        {!loading && !error && visibleProblems.length === 0 && (
          <div className="text-muted-foreground text-sm">No recommendations right now.</div>
        )}
        {visibleProblems.map(p => (
          <div key={p.id} className="bg-card rounded-lg p-3 shadow flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground truncate">{p.title}</span>
              <Badge variant="secondary">{p.difficulty}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-1">
              {p.tags.map(tag => <Badge key={tag} variant="ghost">{tag}</Badge>)}
            </div>
            <div className="text-xs text-muted-foreground mb-2">{p.reason}</div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="primary"
                disabled={submitting === p.id}
                onClick={() => handleFeedback(p.id, 'accept')}
              >Accept</Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={submitting === p.id}
                onClick={() => handleFeedback(p.id, 'skip')}
              >Skip</Button>
              <Button
                size="sm"
                variant="outline"
                disabled={submitting === p.id}
                onClick={() => handleFeedback(p.id, 'not_relevant')}
              >Not Relevant</Button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
} 