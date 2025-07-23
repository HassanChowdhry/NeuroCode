"use client"
import React from "react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
// No need to import Tabs/Tab, using inline tab UI
import { Copy, Sparkles } from 'lucide-react'
// import dynamic from 'next/dynamic' // For Monaco
// const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false })

export interface EditorialData {
  editorialMarkdown: string
  complexity: string
  solutions: { language: string; code: string; author?: string }[]
}

export interface ProblemDetail {
  id: string
  title: string
  difficulty: string
  tags: string[]
  acceptance: number
  statement: string // markdown
  constraints: string[]
  examples: { input: string; output: string; explanation?: string }[]
  templates: { [lang: string]: string }
}

export interface ProblemDetailViewProps {
  problem?: ProblemDetail
  code: string
  setCode: (code: string) => void
  language: string
  setLanguage: (lang: string) => void
  loading?: boolean
  error?: string
  running?: boolean
  submitting?: boolean
  output?: {
    stdout: string
    stderr: string
    testResults: { name: string; passed: boolean; message?: string }[]
  }
  onRun: () => void
  onSubmit: () => void
  // For AI panels
  leftPanel?: React.ReactNode
  rightPanel?: React.ReactNode
  editorialData?: EditorialData
  editorialLoading?: boolean
  editorialError?: string
  onExplainSolution?: (code: string) => void
}

export function ProblemDetailView({
  problem,
  code,
  setCode,
  language,
  setLanguage,
  loading,
  error,
  running,
  submitting,
  output,
  onRun,
  onSubmit,
  leftPanel,
  rightPanel,
  editorialData,
  editorialLoading,
  editorialError,
  onExplainSolution
}: ProblemDetailViewProps) {
  const [tab, setTab] = useState<'problem' | 'editorial'>('problem')

  if (loading) {
    return <div className="p-8"><div className="h-8 w-64 bg-muted animate-pulse rounded mb-4" /><div className="h-96 bg-muted animate-pulse rounded" /></div>
  }
  if (error) {
    return <div className="p-8 text-red-600 font-semibold">{error}</div>
  }
  if (!problem) {
    return <div className="p-8 text-muted-foreground">Problem not found.</div>
  }
  return (
    <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left AI Panel (optional) */}
      {leftPanel && <aside className="hidden lg:block lg:col-span-2">{leftPanel}</aside>}
      {/* Main Content */}
      <main className={`col-span-1 ${leftPanel && rightPanel ? 'lg:col-span-8' : rightPanel || leftPanel ? 'lg:col-span-10' : 'lg:col-span-12'}`}>
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b">
            <button
              className={`px-4 py-2 font-semibold ${tab === 'problem' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-muted-foreground'}`}
              onClick={() => setTab('problem')}
              tabIndex={0}
            >Problem</button>
            {editorialData && (
              <button
                className={`px-4 py-2 font-semibold ${tab === 'editorial' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-muted-foreground'}`}
                onClick={() => setTab('editorial')}
                tabIndex={0}
              >Editorial</button>
            )}
          </div>
        </div>
        {/* Tab Content */}
        {tab === 'problem' && (
          <>
            {/* Title & Meta */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <h1 className="text-2xl font-bold text-foreground">{problem.title}</h1>
              <div className="flex gap-2 items-center flex-wrap">
                <Badge variant="secondary">{problem.difficulty}</Badge>
                {problem.tags.map(tag => <Badge key={tag} variant="ghost">{tag}</Badge>)}
                <span className="text-xs text-muted-foreground ml-2">Acceptance: {problem.acceptance}%</span>
              </div>
            </div>
            {/* Statement */}
            <div className="prose max-w-none mb-6 text-foreground">
              {/* TODO: Use a markdown renderer like react-markdown */}
              <div dangerouslySetInnerHTML={{ __html: problem.statement }} />
            </div>
            {/* Constraints */}
            <div className="mb-4">
              <h2 className="font-semibold mb-1 text-foreground">Constraints</h2>
              <ul className="list-disc ml-6 text-muted-foreground">
                {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
            {/* Examples */}
            <div className="mb-6">
              <h2 className="font-semibold mb-1 text-foreground">Examples</h2>
              <div className="space-y-4">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="bg-muted rounded p-3">
                    <div className="text-xs text-muted-foreground">Input:</div>
                    <pre className="bg-background rounded p-2 text-sm overflow-x-auto">{ex.input}</pre>
                    <div className="text-xs text-muted-foreground mt-1">Output:</div>
                    <pre className="bg-background rounded p-2 text-sm overflow-x-auto">{ex.output}</pre>
                    {ex.explanation && <div className="text-xs text-muted-foreground mt-1">{ex.explanation}</div>}
                  </div>
                ))}
              </div>
            </div>
            {/* Editor & Controls */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <label htmlFor="language" className="text-sm font-medium">Language:</label>
                <select
                  id="language"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="input-text"
                >
                  {Object.keys(problem.templates).map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              {/* Monaco Editor placeholder */}
              <div className="h-64 md:h-96 mb-2 border rounded bg-background flex items-center justify-center text-muted-foreground">
                {/* TODO: Replace with MonacoEditor */}
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full h-full bg-transparent outline-none resize-none p-2 font-mono text-sm"
                  spellCheck={false}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={onRun} disabled={running || submitting}>{running ? 'Running...' : 'Run'}</Button>
                <Button onClick={onSubmit} disabled={submitting || running} variant="secondary">{submitting ? 'Submitting...' : 'Submit'}</Button>
              </div>
            </div>
            {/* Output Pane */}
            <div className="mb-6">
              <h2 className="font-semibold mb-1 text-foreground">Output</h2>
              {running || submitting ? (
                <div className="h-8 w-32 bg-muted animate-pulse rounded" />
              ) : output ? (
                <div className="bg-muted rounded p-3">
                  <div className="mb-1 text-xs text-muted-foreground">stdout:</div>
                  <pre className="bg-background rounded p-2 text-sm overflow-x-auto mb-2">{output.stdout}</pre>
                  {output.stderr && <><div className="mb-1 text-xs text-muted-foreground">stderr:</div><pre className="bg-background rounded p-2 text-sm overflow-x-auto mb-2 text-red-500">{output.stderr}</pre></>}
                  <div className="mb-1 text-xs text-muted-foreground">Test Results:</div>
                  <ul className="list-disc ml-6">
                    {output.testResults.map((tr, i) => (
                      <li key={i} className={tr.passed ? 'text-green-600' : 'text-red-600'}>
                        {tr.name}: {tr.passed ? 'Passed' : 'Failed'} {tr.message && <span className="text-xs text-muted-foreground">({tr.message})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : <div className="text-muted-foreground text-sm">No output yet.</div>}
            </div>
          </>
        )}
        {tab === 'editorial' && editorialData && (
          <div className="space-y-8">
            {/* Official Editorial */}
            <section>
              <h2 className="text-xl font-bold mb-2">Official Editorial</h2>
              {editorialLoading ? (
                <div className="h-32 bg-muted animate-pulse rounded" />
              ) : editorialError ? (
                <div className="text-red-600">{editorialError}</div>
              ) : (
                <div className="prose max-w-none mb-4">
                  {/* TODO: Use react-markdown or similar */}
                  <div dangerouslySetInnerHTML={{ __html: editorialData.editorialMarkdown }} />
                </div>
              )}
            </section>
            {/* Complexity Discussion */}
            <section>
              <h3 className="font-semibold mb-1">Complexity</h3>
              {editorialLoading ? (
                <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              ) : (
                <div className="text-muted-foreground">{editorialData.complexity}</div>
              )}
            </section>
            {/* Community Solutions */}
            <section>
              <h3 className="font-semibold mb-2">Community Solutions</h3>
              {editorialLoading ? (
                <div className="h-24 bg-muted animate-pulse rounded" />
              ) : (
                <div className="space-y-6">
                  {Array.isArray(editorialData.solutions) && ['Python', 'C++', 'Java'].map(lang => {
                    const sol = editorialData.solutions.find(s => s.language.toLowerCase() === lang.toLowerCase())
                    if (!sol) return null
                    return (
                      <div key={lang} className="bg-muted rounded p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{lang}</Badge>
                          {sol.author && <span className="text-xs text-muted-foreground">by {sol.author}</span>}
                        </div>
                        <pre className="bg-background rounded p-2 text-xs font-mono overflow-x-auto whitespace-pre-wrap relative">
                          <button
                            className="absolute top-2 right-2 text-muted-foreground hover:text-primary-500"
                            onClick={() => navigator.clipboard.writeText(sol.code)}
                            aria-label="Copy code"
                            tabIndex={0}
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          {sol.code}
                        </pre>
                        {onExplainSolution && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-2 flex items-center gap-2"
                            onClick={() => onExplainSolution(sol.code)}
                          >
                            <Sparkles className="h-4 w-4 text-primary-500" /> Explain this solution
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
      {/* Right AI Panel (optional) */}
      {rightPanel && <aside className="hidden lg:block lg:col-span-2">{rightPanel}</aside>}
    </div>
  )
} 