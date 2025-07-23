"use client"
import * as React from "react"
import { useState } from "react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, FileDiff, Sparkles } from 'lucide-react'

export interface Submission {
  id: string
  timestamp: string
  problem: string
  language: string
  status: string
  runtime: string
  memory: string
  code: string
  judge0: {
    stdout: string
    stderr: string
    testResults: { name: string; passed: boolean; message?: string }[]
  }
  aiTutorFeedback: string
  codeDiff?: string // diff vs most recent accepted
}

export interface SubmissionsHistoryPageProps {
  submissions: Submission[]
  loading?: boolean
  error?: string
  filters?: {
    status?: string[]
    language?: string[]
    problem?: string[]
  }
  onFilterChange?: (filters: any) => void
  search?: string
  onSearchChange?: (s: string) => void
}

export function SubmissionsHistoryPage({
  submissions,
  loading,
  error,
  filters = {},
  onFilterChange,
  search = '',
  onSearchChange
}: SubmissionsHistoryPageProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selected, setSelected] = useState<Submission | null>(null)

  // Filter/search logic (client-side for demo)
  const filtered = submissions.filter(s => {
    if (filters.status && filters.status.length && !filters.status.includes(s.status)) return false
    if (filters.language && filters.language.length && !filters.language.includes(s.language)) return false
    if (filters.problem && filters.problem.length && !filters.problem.includes(s.problem)) return false
    if (search && !s.problem.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function openDrawer(sub: Submission) {
    setSelected(sub)
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
    setSelected(null)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Submission History</h1>
      {/* Filters/Search */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          type="search"
          placeholder="Search by problem..."
          value={search}
          onChange={e => onSearchChange?.(e.target.value)}
          className="input-text w-48"
        />
        {/* Status filter */}
        {['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded'].map(st => (
          <Button
            key={st}
            size="sm"
            variant={filters.status?.includes(st) ? 'primary' : 'ghost'}
            onClick={() => onFilterChange?.({ ...filters, status: filters.status?.includes(st) ? filters.status.filter((x: string) => x !== st) : [...(filters.status || []), st] })}
          >{st}</Button>
        ))}
        {/* Language filter */}
        <select
          value={filters.language?.[0] || ''}
          onChange={e => onFilterChange?.({ ...filters, language: e.target.value ? [e.target.value] : [] })}
          className="input-text"
        >
          <option value="">All Languages</option>
          {Array.from(new Set(submissions.map(s => s.language))).map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      {/* Table */}
      <div className="bg-card rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-2 text-left">Timestamp</th>
              <th className="py-2 px-2 text-left">Problem</th>
              <th className="py-2 px-2 text-left">Language</th>
              <th className="py-2 px-2 text-left">Status</th>
              <th className="py-2 px-2 text-left">Runtime</th>
              <th className="py-2 px-2 text-left">Memory</th>
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 6 }).map((_, j) => (
                  <td key={j} className="py-2 px-2"><div className="h-4 w-24 bg-muted rounded animate-pulse" /></td>
                ))}
              </tr>
            )) : error ? (
              <tr><td colSpan={6} className="text-red-600 py-4">{error}</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-muted-foreground py-4">No submissions found.</td></tr>
            ) : filtered.map(sub => (
              <tr key={sub.id} className="hover:bg-muted cursor-pointer" onClick={() => openDrawer(sub)}>
                <td className="py-2 px-2 whitespace-nowrap">{sub.timestamp}</td>
                <td className="py-2 px-2 whitespace-nowrap">{sub.problem}</td>
                <td className="py-2 px-2 whitespace-nowrap">{sub.language}</td>
                <td className="py-2 px-2 whitespace-nowrap"><Badge variant={sub.status === 'Accepted' ? 'success' : 'outline'}>{sub.status}</Badge></td>
                <td className="py-2 px-2 whitespace-nowrap">{sub.runtime}</td>
                <td className="py-2 px-2 whitespace-nowrap">{sub.memory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Drawer */}
      {drawerOpen && selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={closeDrawer} />
          <aside className="relative w-full max-w-2xl h-full bg-background shadow-xl border-l flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-500" />
                <span className="font-semibold text-lg">Submission Details</span>
              </div>
              <Button variant="ghost" size="sm" onClick={closeDrawer}>Close</Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <div className="font-semibold text-foreground">{selected.problem}</div>
                <div className="text-xs text-muted-foreground">{selected.timestamp} • {selected.language} • <Badge variant={selected.status === 'Accepted' ? 'success' : 'outline'}>{selected.status}</Badge></div>
              </div>
              {/* User Code */}
              <div>
                <div className="font-semibold mb-1">Your Code</div>
                <pre className="bg-muted rounded p-2 text-xs font-mono overflow-x-auto max-h-64 whitespace-pre-wrap">{selected.code}</pre>
              </div>
              {/* Judge0 Results */}
              <div>
                <div className="font-semibold mb-1">Judge0 Results</div>
                <div className="mb-1 text-xs text-muted-foreground">stdout:</div>
                <pre className="bg-background rounded p-2 text-xs overflow-x-auto mb-2">{selected.judge0.stdout}</pre>
                {selected.judge0.stderr && <><div className="mb-1 text-xs text-muted-foreground">stderr:</div><pre className="bg-background rounded p-2 text-xs overflow-x-auto mb-2 text-red-500">{selected.judge0.stderr}</pre></>}
                <div className="mb-1 text-xs text-muted-foreground">Test Results:</div>
                <ul className="list-disc ml-6">
                  {selected.judge0.testResults.map((tr, i) => (
                    <li key={i} className={tr.passed ? 'text-green-600' : 'text-red-600'}>
                      {tr.name}: {tr.passed ? 'Passed' : 'Failed'} {tr.message && <span className="text-xs text-muted-foreground">({tr.message})</span>}
                    </li>
                  ))}
                </ul>
              </div>
              {/* AI Tutor Feedback */}
              <div>
                <div className="font-semibold mb-1 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary-500" />AI Tutor Feedback</div>
                <div className="bg-muted rounded p-2 text-sm text-foreground whitespace-pre-wrap">{selected.aiTutorFeedback}</div>
              </div>
              {/* Code Diff */}
              {selected.codeDiff && (
                <div>
                  <div className="font-semibold mb-1 flex items-center gap-2"><FileDiff className="h-4 w-4 text-primary-500" />Code Diff vs Accepted</div>
                  <pre className="bg-background rounded p-2 text-xs font-mono overflow-x-auto max-h-64 whitespace-pre-wrap">{selected.codeDiff}</pre>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  )
} 