"use client"
import * as React from "react"
import { Tooltip } from '@radix-ui/react-tooltip'
import { Flame } from 'lucide-react'

// Color scale from design tokens (light to dark)
const colorScale = [
  'bg-primary-50',
  'bg-primary-100',
  'bg-primary-200',
  'bg-primary-300',
  'bg-primary-400',
  'bg-primary-500',
]

export interface DayContribution {
  date: string // ISO string, e.g. '2024-06-20'
  count: number // problems solved
}

export interface ContributionHeatmapProps {
  data: DayContribution[] // should be at least 1 year
  loading?: boolean
  error?: string
  timeZone?: string // default America/Halifax
}

function getColor(count: number, max: number) {
  if (count === 0) return colorScale[0]
  if (max === 0) return colorScale[0]
  const idx = Math.min(colorScale.length - 1, Math.floor((count / max) * (colorScale.length - 1)))
  return colorScale[idx]
}

function getStreaks(data: DayContribution[]) {
  let current = 0, best = 0, temp = 0
  let today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Halifax' })
  let inStreak = false
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) {
      temp++
      if (!inStreak && data[i].date === today) inStreak = true
    } else {
      if (inStreak) break
      temp = 0
    }
    if (temp > best) best = temp
  }
  // Current streak
  current = 0
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) current++
    else break
  }
  return { current, best }
}

export function ContributionHeatmap({ data, loading, error, timeZone = 'America/Halifax' }: ContributionHeatmapProps) {
  // Prepare calendar grid (weeks x days)
  // Start from last Sunday before today
  const today = new Date(new Date().toLocaleString('en-US', { timeZone }))
  const start = new Date(today)
  start.setDate(start.getDate() - ((today.getDay() + 6) % 7) - 51 * 7) // 52 weeks
  const days: { date: string, count: number }[] = []
  let d = new Date(start)
  for (let i = 0; i < 52 * 7; i++) {
    const iso = d.toLocaleDateString('en-CA', { timeZone })
    const found = data.find(day => day.date === iso)
    days.push({ date: iso, count: found?.count || 0 })
    d.setDate(d.getDate() + 1)
  }
  const max = Math.max(...days.map(d => d.count))
  const { current, best } = getStreaks(days)

  return (
    <div className="bg-card rounded-xl p-6 shadow space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Flame className="h-5 w-5 text-primary-500" />
        <span className="font-semibold text-lg">Contribution Heatmap</span>
        <span className="ml-auto text-xs text-muted-foreground">Current streak: {current} • Best: {best}</span>
      </div>
      {loading ? (
        <div className="h-32 bg-muted animate-pulse rounded" />
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {/* Weeks */}
            {Array.from({ length: 52 }).map((_, week) => (
              <div key={week} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, day) => {
                  const idx = week * 7 + day
                  if (idx >= days.length) return null
                  const cell = days[idx]
                  return (
                    <div
                      key={cell.date}
                      className={`w-4 h-4 rounded ${getColor(cell.count, max)} cursor-pointer border border-background`}
                      tabIndex={0}
                      title={`${cell.date}: ${cell.count} solved`}
                      aria-label={`${cell.date}: ${cell.count} problems solved`}
                    >
                      <Tooltip>
                        <span>{cell.date}: {cell.count} solved</span>
                      </Tooltip>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 