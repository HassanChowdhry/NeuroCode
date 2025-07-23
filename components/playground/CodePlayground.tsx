"use client"
import * as React from "react"
import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Save, Play, Loader2 } from 'lucide-react'
// import dynamic from 'next/dynamic'
// const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false })

export interface CodePlaygroundProps {
  languages: { value: string; label: string; template: string }[]
  onRun: (code: string, language: string) => Promise<{ stdout: string; stderr: string }>
  onSaveSnippet: (name: string, code: string, language: string) => Promise<void>
  onAITutor?: (code: string, language: string) => void
  loading?: boolean
  error?: string
  output?: { stdout: string; stderr: string }
}

export function CodePlayground({
  languages,
  onRun,
  onSaveSnippet,
  onAITutor,
  loading,
  error,
  output
}: CodePlaygroundProps) {
  const [language, setLanguage] = useState(languages[0]?.value || "python")
  const [code, setCode] = useState(languages[0]?.template || "")
  const [snippetName, setSnippetName] = useState("")
  const [running, setRunning] = useState(false)
  const [saving, setSaving] = useState(false)
  const [runOutput, setRunOutput] = useState<{ stdout: string; stderr: string } | null>(null)
  const [runError, setRunError] = useState<string | null>(null)

  function handleLanguageChange(lang: string) {
    setLanguage(lang)
    const found = languages.find(l => l.value === lang)
    setCode(found?.template || "")
  }

  async function handleRun() {
    setRunning(true)
    setRunError(null)
    try {
      const result = await onRun(code, language)
      setRunOutput(result)
    } catch (e: any) {
      setRunError(e.message || 'Run failed')
    } finally {
      setRunning(false)
    }
  }

  async function handleSave() {
    if (!snippetName.trim()) return
    setSaving(true)
    try {
      await onSaveSnippet(snippetName, code, language)
      setSnippetName("")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">Code Playground</h1>
      <div className="flex flex-col md:flex-row gap-4 items-center mb-2">
        <label htmlFor="language" className="font-medium">Language:</label>
        <select
          id="language"
          value={language}
          onChange={e => handleLanguageChange(e.target.value)}
          className="input-text w-40"
        >
          {languages.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
        <Input
          placeholder="Snippet name (optional)"
          value={snippetName}
          onChange={e => setSnippetName(e.target.value)}
          className="w-64"
        />
        <Button size="sm" onClick={handleSave} disabled={saving || !snippetName.trim()}><Save className="h-4 w-4 mr-1" />Save</Button>
        {onAITutor && (
          <Button size="sm" variant="ghost" onClick={() => onAITutor(code, language)}><Sparkles className="h-4 w-4 text-primary-500 mr-1" />Help me optimize</Button>
        )}
      </div>
      {/* Monaco Editor placeholder */}
      <div className="h-96 border rounded bg-background flex items-center justify-center text-muted-foreground mb-2">
        {/* TODO: Replace with MonacoEditor */}
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full h-full bg-transparent outline-none resize-none p-2 font-mono text-sm"
          spellCheck={false}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleRun} disabled={running}><Play className="h-4 w-4 mr-1" />{running ? 'Running...' : 'Run'}</Button>
      </div>
      {/* Output */}
      <div className="mt-4">
        <h2 className="font-semibold mb-1">Output</h2>
        {running ? (
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        ) : runError ? (
          <div className="text-red-600">{runError}</div>
        ) : runOutput ? (
          <div className="bg-muted rounded p-3">
            <div className="mb-1 text-xs text-muted-foreground">stdout:</div>
            <pre className="bg-background rounded p-2 text-sm overflow-x-auto mb-2">{runOutput.stdout}</pre>
            {runOutput.stderr && <><div className="mb-1 text-xs text-muted-foreground">stderr:</div><pre className="bg-background rounded p-2 text-sm overflow-x-auto mb-2 text-red-500">{runOutput.stderr}</pre></>}
          </div>
        ) : <div className="text-muted-foreground text-sm">No output yet.</div>}
      </div>
    </div>
  )
} 