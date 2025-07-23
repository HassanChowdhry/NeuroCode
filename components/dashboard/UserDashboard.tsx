"use client"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Flame, TrendingUp, Loader2 } from 'lucide-react'
import React from 'react'

// Types
export interface Problem {
  id: string
  title: string
  slug: string
  difficulty: string
  isPremium: boolean
}
export interface Submission {
  id: string
  problemTitle: string
  status: string
  submittedAt: string
}
export interface TopicProgress {
  topic: string
  percent: number
}
export interface UserDashboardProps {
  userName: string
  lastProblem?: Problem
  recommended: Problem[]
  streak: number[] // 0/1 for each day, length 30
  topicProgress: TopicProgress[]
  recentSubmissions: Submission[]
  loading?: boolean
}

export function UserDashboard({
  userName,
  lastProblem,
  recommended,
  streak,
  topicProgress,
  recentSubmissions,
  loading
}: UserDashboardProps) {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Welcome Banner */}
      <section className="bg-card rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-base">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-foreground">Welcome back, {userName}!</h2>
          <p className="text-muted-foreground mb-2">Ready to keep learning?</p>
          {loading ? (
            <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          ) : lastProblem ? (
            <Button asChild size="md" className="mt-2">
              <a href={`/problems/${lastProblem.slug}`}>Resume: {lastProblem.title}</a>
            </Button>
          ) : (
            <Button asChild size="md" className="mt-2">
              <a href="/problems">Start a Problem</a>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Flame className="text-primary-500" />
          <span className="text-lg font-semibold">{streak?.filter(Boolean).length ?? 0}</span>
          <span className="text-muted-foreground">day streak</span>
        </div>
      </section>

      {/* Recommended Problems */}
      <section>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary-500" /> Recommended for you
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
          )) : recommended.map(p => (
            <div key={p.id} className="bg-card rounded-lg p-4 flex flex-col gap-2 shadow">
              <a href={`/problems/${p.slug}`} className="font-medium text-foreground hover:underline">{p.title}</a>
              <div className="flex gap-2 items-center">
                <Badge variant="secondary">{p.difficulty}</Badge>
                {p.isPremium && <Badge variant="success">Premium</Badge>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Streak Calendar Mini View */}
      <section>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary-500" /> Streak
        </h3>
        <div className="flex gap-1 flex-wrap max-w-xs">
          {loading ? Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-muted rounded animate-pulse" />
          )) : streak.map((s, i) => (
            <div key={i} className={`w-4 h-4 rounded ${s ? 'bg-primary-500' : 'bg-muted'}`} />
          ))}
        </div>
      </section>

      {/* Progress by Topic */}
      <section>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary-500" /> Progress by Topic
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
          )) : topicProgress.map(tp => (
            <div key={tp.topic} className="bg-card rounded-lg p-4 flex flex-col gap-2 shadow">
              <span className="font-medium text-foreground">{tp.topic}</span>
              <div className="w-full bg-muted rounded h-2">
                <div className="bg-primary-500 h-2 rounded" style={{ width: `${tp.percent}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{tp.percent}% complete</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Submissions */}
      <section>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Loader2 className="h-5 w-5 text-primary-500" /> Recent Submissions
        </h3>
        <div className="bg-card rounded-xl p-4 shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-2">Problem</th>
                <th className="text-left py-2 px-2">Status</th>
                <th className="text-left py-2 px-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {loading ? Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td className="py-2 px-2"><div className="h-4 w-32 bg-muted rounded animate-pulse" /></td>
                  <td className="py-2 px-2"><div className="h-4 w-16 bg-muted rounded animate-pulse" /></td>
                  <td className="py-2 px-2"><div className="h-4 w-20 bg-muted rounded animate-pulse" /></td>
                </tr>
              )) : recentSubmissions.map(s => (
                <tr key={s.id}>
                  <td className="py-2 px-2">{s.problemTitle}</td>
                  <td className="py-2 px-2"><Badge variant="outline">{s.status}</Badge></td>
                  <td className="py-2 px-2">{s.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA to Study Plan */}
      <section className="flex justify-center">
        <Button asChild size="lg" className="mt-4">
          <a href="/study-plans">Go to My Study Plan</a>
        </Button>
      </section>
    </div>
  )
} 