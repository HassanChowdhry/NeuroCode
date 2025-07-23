"use client"
import * as React from "react"
import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Calendar, Flag, TrendingUp } from 'lucide-react'

export interface ProblemSet {
  id: string
  title: string
  problems: { id: string; title: string; completed: boolean }[]
  milestone?: string
}

export interface StudyPlan {
  id: string
  name: string
  description: string
  progress: number // 0-100
  problemSets: ProblemSet[]
  milestones: { id: string; title: string; completed: boolean }[]
  dailyTasks: { id: string; title: string; due: string; completed: boolean }[]
  userGoal?: string
  schedule?: string
}

export interface StudyPlansPageProps {
  plans: StudyPlan[]
  loading?: boolean
  error?: string
  onMarkTaskComplete: (planId: string, taskId: string) => void
  onMarkProblemSetComplete: (planId: string, setId: string) => void
}

export function StudyPlansPage({ plans, loading, error, onMarkTaskComplete, onMarkProblemSetComplete }: StudyPlansPageProps) {
  // Gather all upcoming due tasks
  const upcomingTasks = plans.flatMap(plan => plan.dailyTasks.filter(t => !t.completed)).sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()).slice(0, 5)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary-500" /> Study Plans</h1>
      {/* Upcoming Due Tasks Widget */}
      <section className="mb-8">
        <div className="bg-card rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-semibold text-lg flex items-center gap-2"><Calendar className="h-5 w-5 text-primary-500" /> Upcoming Tasks</div>
          <div className="flex-1 flex flex-wrap gap-2">
            {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-6 w-32 bg-muted animate-pulse rounded" />) :
              upcomingTasks.length === 0 ? <span className="text-muted-foreground">No upcoming tasks!</span> :
                upcomingTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2 bg-muted rounded px-3 py-1">
                    <span>{task.title}</span>
                    <span className="text-xs text-muted-foreground">Due: {new Date(task.due).toLocaleDateString()}</span>
                    {!task.completed && <Button size="sm" onClick={() => onMarkTaskComplete(task.id.split('-')[0], task.id)}><CheckCircle className="h-4 w-4 mr-1" />Mark Complete</Button>}
                  </div>
                ))}
          </div>
        </div>
      </section>
      {/* Study Plans List */}
      <section className="space-y-8">
        {loading ? Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-40 bg-muted animate-pulse rounded" />) : error ? (
          <div className="text-red-600">{error}</div>
        ) : plans.length === 0 ? (
          <div className="text-muted-foreground">No study plans found.</div>
        ) : plans.map(plan => (
          <div key={plan.id} className="bg-card rounded-xl p-6 shadow space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
              <Badge variant="secondary">{plan.userGoal || 'General'}</Badge>
              {plan.schedule && <span className="text-xs text-muted-foreground">{plan.schedule}</span>}
            </div>
            <div className="text-muted-foreground mb-2">{plan.description}</div>
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded h-3 mb-2">
              <div className="bg-primary-500 h-3 rounded" style={{ width: `${plan.progress}%` }} />
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {plan.milestones.map(m => (
                <span key={m.id} className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${m.completed ? 'bg-success-500 text-white' : 'bg-muted text-muted-foreground'}`}><Flag className="h-3 w-3" />{m.title}</span>
              ))}
            </div>
            {/* Problem Sets */}
            <div className="space-y-4">
              {plan.problemSets.map(set => (
                <div key={set.id} className="bg-muted rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{set.title}</span>
                    {set.milestone && <Badge variant="outline">{set.milestone}</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {set.problems.map(p => (
                      <span key={p.id} className={`px-2 py-1 rounded text-xs ${p.completed ? 'bg-success-500 text-white' : 'bg-background border'}`}>{p.title}</span>
                    ))}
                  </div>
                  <Button size="sm" onClick={() => onMarkProblemSetComplete(plan.id, set.id)} disabled={set.problems.every(p => p.completed)}>
                    <CheckCircle className="h-4 w-4 mr-1" />Mark Complete
                  </Button>
                </div>
              ))}
            </div>
            {/* Daily Tasks */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Today's Tasks</h4>
              <div className="flex flex-wrap gap-2">
                {plan.dailyTasks.length === 0 ? <span className="text-muted-foreground">No tasks for today.</span> :
                  plan.dailyTasks.map(task => (
                    <div key={task.id} className={`flex items-center gap-2 px-3 py-1 rounded ${task.completed ? 'bg-success-500 text-white' : 'bg-muted'}`}>
                      <span>{task.title}</span>
                      <span className="text-xs text-muted-foreground">Due: {new Date(task.due).toLocaleDateString()}</span>
                      {!task.completed && <Button size="sm" onClick={() => onMarkTaskComplete(plan.id, task.id)}><CheckCircle className="h-4 w-4 mr-1" />Mark Complete</Button>}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
} 