"use client"
import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Clock, FileText, Share2, Loader2 } from 'lucide-react'

export interface InterviewProblem {
  id: string
  title: string
  statement: string
  difficulty: string
  tags: string[]
  template: string
}

export interface TimedInterviewSessionProps {
  availableTopics: string[]
  onStart: (duration: number, topics: string[]) => Promise<InterviewProblem[]>
  onExport: (transcript: string, code: string) => void
  onShare: (link: string) => void
  loading?: boolean
  error?: string
  readOnly?: boolean
  initialProblems?: InterviewProblem[]
  initialDuration?: number
  initialTopics?: string[]
  transcript?: string
  code?: string
  shareLink?: string
}

export function TimedInterviewSession({
  availableTopics,
  onStart,
  onExport,
  onShare,
  loading,
  error,
  readOnly = false,
  initialProblems = [],
  initialDuration = 30,
  initialTopics = [],
  transcript = "",
  code = "",
  shareLink
}: TimedInterviewSessionProps) {
  const [started, setStarted] = useState(!!readOnly || initialProblems.length > 0)
  const [duration, setDuration] = useState(initialDuration)
  const [topics, setTopics] = useState<string[]>(initialTopics)
  const [problems, setProblems] = useState<InterviewProblem[]>(initialProblems)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [timer, setTimer] = useState(duration * 60)
  const [timerActive, setTimerActive] = useState(false)
  const [userCode, setUserCode] = useState(code || (initialProblems[0]?.template || ""))
  const [notes, setNotes] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [hintTimeout, setHintTimeout] = useState<NodeJS.Timeout | null>(null)
  const [exporting, setExporting] = useState(false)
  const [sharing, setSharing] = useState(false)

  // Timer logic
  useEffect(() => {
    if (!timerActive || readOnly) return
    if (timer <= 0) return
    const interval = setInterval(() => setTimer(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timerActive, timer, readOnly])

  // Start session
  async function handleStart() {
    setStarted(true)
    setTimer(duration * 60)
    setTimerActive(true)
    setShowHint(false)
    setProblems([])
    setCurrentIdx(0)
    setUserCode("")
    setNotes("")
    if (hintTimeout) clearTimeout(hintTimeout)
    const pulled = await onStart(duration, topics)
    setProblems(pulled)
    setUserCode(pulled[0]?.template || "")
    setTimeout(() => setShowHint(true), 120 * 1000) // 2 min delay
  }

  // Hint delay
  useEffect(() => {
    if (!started || readOnly) return
    setShowHint(false)
    if (hintTimeout) clearTimeout(hintTimeout)
    const timeout = setTimeout(() => setShowHint(true), 120 * 1000)
    setHintTimeout(timeout)
    return () => clearTimeout(timeout)
  }, [currentIdx, started, readOnly])

  // Export transcript + code
  async function handleExport() {
    setExporting(true)
    await onExport(notes, userCode)
    setExporting(false)
  }

  // Share link
  async function handleShare() {
    setSharing(true)
    await onShare(shareLink || window.location.href)
    setSharing(false)
  }

  // Minimal UI for read-only
  if (readOnly) {
    return (
      <div className="container mx-auto py-8 max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">Interview Transcript</h1>
        <div className="bg-card rounded-xl p-6 shadow space-y-4">
          <div className="font-semibold">Transcript</div>
          <pre className="bg-muted rounded p-2 text-sm whitespace-pre-wrap">{transcript}</pre>
          <div className="font-semibold">Code</div>
          <pre className="bg-muted rounded p-2 text-sm whitespace-pre-wrap">{code}</pre>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="ghost" onClick={handleShare}><Share2 className="h-4 w-4 mr-1" />Copy Share Link</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">Timed Interview Session</h1>
      {!started ? (
        <div className="bg-card rounded-xl p-6 shadow space-y-4">
          <div className="flex flex-col gap-4">
            <label className="font-medium">Duration (minutes):
              <Input type="number" min={10} max={180} value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-24 ml-2" />
            </label>
            <label className="font-medium">Topics:
              <select multiple value={topics} onChange={e => setTopics(Array.from(e.target.selectedOptions, o => o.value))} className="input-text ml-2 w-64">
                {availableTopics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <Button size="lg" onClick={handleStart} disabled={loading}>{loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Start Interview'}</Button>
            {error && <div className="text-red-600">{error}</div>}
          </div>
        </div>
      ) : problems.length === 0 ? (
        <div className="h-32 bg-muted animate-pulse rounded" />
      ) : (
        <div className="bg-card rounded-xl p-6 shadow space-y-6">
          {/* Timer */}
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-primary-500" />
            <span className="font-semibold">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
          </div>
          {/* Problem */}
          <div>
            <div className="font-semibold text-lg mb-1">{problems[currentIdx].title}</div>
            <div className="prose max-w-none mb-2 text-foreground"><div dangerouslySetInnerHTML={{ __html: problems[currentIdx].statement }} /></div>
            <div className="flex gap-2 mb-2">
              {problems[currentIdx].tags.map(tag => <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full">{tag}</span>)}
              <span className="text-xs text-muted-foreground">{problems[currentIdx].difficulty}</span>
            </div>
          </div>
          {/* Code Editor (textarea placeholder) */}
          <div className="h-64 border rounded bg-background flex items-center justify-center text-muted-foreground mb-2">
            {/* TODO: Replace with MonacoEditor */}
            <textarea
              value={userCode}
              onChange={e => setUserCode(e.target.value)}
              className="w-full h-full bg-transparent outline-none resize-none p-2 font-mono text-sm"
              spellCheck={false}
            />
          </div>
          {/* Notes Panel */}
          <div>
            <div className="font-semibold mb-1">Notes</div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full h-24 bg-muted rounded p-2 text-sm"
              placeholder="Jot down your thoughts, approaches, or questions..."
            />
          </div>
          {/* Hint (delayed) */}
          <div className="mt-2">
            <Button size="sm" variant="ghost" disabled={!showHint}><Sparkles className="h-4 w-4 text-primary-500 mr-1" />Show Hint</Button>
            {!showHint && <span className="text-xs text-muted-foreground ml-2">Hint available after 2 minutes</span>}
          </div>
          {/* Export/Share */}
          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={handleExport} disabled={exporting}><FileText className="h-4 w-4 mr-1" />Export Transcript + Code</Button>
            <Button size="sm" variant="ghost" onClick={handleShare} disabled={sharing}><Share2 className="h-4 w-4 mr-1" />Copy Share Link</Button>
          </div>
        </div>
      )}
    </div>
  )
} 