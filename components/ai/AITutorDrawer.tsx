"use client"
import * as React from "react"
import { useReducer } from "react"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Sparkles, MessageSquare, FileDiff } from 'lucide-react'

// MCP Context Types
export interface MCPContext {
  current_problem: { id: string; title: string; difficulty: string }
  attempts: number
  last_runtime_error?: string
  weak_topics: string[]
}

// State Machine Events
export type TutorEvent =
  | { type: 'ASK_HINT' }
  | { type: 'ASK_EXPLAIN' }
  | { type: 'ASK_CHAT'; question: string }
  | { type: 'REVEAL_DEEPER_HINT' }
  | { type: 'RESET' }

// State
interface TutorState {
  loading: boolean
  error?: string
  shortHint?: string
  deeperHint?: string
  deeperHintRevealed: boolean
  failedTestExplanation?: string
  chatHistory: { role: 'user' | 'ai'; message: string }[]
  codeDiff?: string
}

const initialState: TutorState = {
  loading: false,
  error: undefined,
  shortHint: undefined,
  deeperHint: undefined,
  deeperHintRevealed: false,
  failedTestExplanation: undefined,
  chatHistory: [],
  codeDiff: undefined,
}

function tutorReducer(state: TutorState, event: TutorEvent): TutorState {
  switch (event.type) {
    case 'ASK_HINT':
      return { ...state, loading: true, error: undefined }
    case 'ASK_EXPLAIN':
      return { ...state, loading: true, error: undefined }
    case 'ASK_CHAT':
      return {
        ...state,
        loading: true,
        error: undefined,
        chatHistory: [...state.chatHistory, { role: 'user', message: event.question }],
      }
    case 'REVEAL_DEEPER_HINT':
      return { ...state, deeperHintRevealed: true }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

// Simulate async AI responses (replace with real API calls)
async function fakeAIResponse(event: TutorEvent, context: MCPContext): Promise<Partial<TutorState>> {
  await new Promise(r => setTimeout(r, 800))
  switch (event.type) {
    case 'ASK_HINT':
      return { shortHint: `Try breaking the problem into smaller parts.`, deeperHint: `Consider using a hash map to optimize your solution.` }
    case 'ASK_EXPLAIN':
      return { failedTestExplanation: context.last_runtime_error ? `Your code failed because: ${context.last_runtime_error}` : `No runtime error found.` }
    case 'ASK_CHAT':
      return { chatHistory: [{ role: 'ai', message: `Here's an answer to: "${event.question}"` }] }
    default:
      return {}
  }
}

export interface AITutorDrawerProps {
  open: boolean
  onClose: () => void
  context: MCPContext
}

export function AITutorDrawer({ open, onClose, context }: AITutorDrawerProps) {
  const [state, dispatch] = useReducer(tutorReducer, initialState)
  const [userInput, setUserInput] = React.useState("")

  // Handle events and simulate AI
  async function handleEvent(event: TutorEvent) {
    dispatch(event)
    try {
      const aiResult = await fakeAIResponse(event, context)
      if (event.type === 'ASK_CHAT' && aiResult.chatHistory) {
        dispatch({ type: 'RESET' }) // Reset loading
        dispatch(event) // Re-add user message
        // Add AI message
        state.chatHistory.push(...aiResult.chatHistory)
      } else {
        dispatch({ type: 'RESET' })
        dispatch(event)
        Object.entries(aiResult).forEach(([k, v]) => {
          if (v !== undefined) {
            // @ts-ignore
            state[k] = v
          }
        })
      }
    } catch (e) {
      dispatch({ type: 'RESET' })
      // @ts-ignore
      state.error = e.message || 'AI error'
    }
  }

  // Drawer UI
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      {/* Drawer */}
      <aside className="relative w-full max-w-md h-full bg-background shadow-xl border-l flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-500" />
            <span className="font-semibold text-lg">AI Tutor</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Problem context */}
          <div>
            <div className="font-semibold text-foreground">{context.current_problem.title}</div>
            <Badge variant="secondary" className="mr-2">{context.current_problem.difficulty}</Badge>
            <span className="text-xs text-muted-foreground">Attempts: {context.attempts}</span>
            {context.weak_topics.length > 0 && (
              <div className="mt-1 text-xs text-warning-500">Weak topics: {context.weak_topics.join(', ')}</div>
            )}
          </div>
          {/* Short Hint */}
          <div>
            <Button variant="outline" size="sm" onClick={() => handleEvent({ type: 'ASK_HINT' })} disabled={state.loading}>Get Hint</Button>
            {state.shortHint && (
              <div className="mt-2 bg-muted rounded p-2 text-sm text-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary-500" /> {state.shortHint}
                {!state.deeperHintRevealed && state.deeperHint && (
                  <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'REVEAL_DEEPER_HINT' })}>Show More</Button>
                )}
              </div>
            )}
            {state.deeperHintRevealed && state.deeperHint && (
              <div className="mt-2 bg-muted rounded p-2 text-sm text-foreground flex items-center gap-2 border-t">
                <BookOpen className="h-4 w-4 text-primary-500" /> {state.deeperHint}
              </div>
            )}
          </div>
          {/* Explain Failed Test Case */}
          <div>
            <Button variant="outline" size="sm" onClick={() => handleEvent({ type: 'ASK_EXPLAIN' })} disabled={state.loading}>Explain Failed Test</Button>
            {state.failedTestExplanation && (
              <div className="mt-2 bg-muted rounded p-2 text-sm text-foreground flex items-center gap-2">
                <FileDiff className="h-4 w-4 text-primary-500" /> {state.failedTestExplanation}
              </div>
            )}
          </div>
          {/* Chat/Ask AI */}
          <div>
            <form className="flex gap-2" onSubmit={e => { e.preventDefault(); if (userInput) handleEvent({ type: 'ASK_CHAT', question: userInput }); setUserInput("") }}>
              <input
                className="input-text flex-1"
                placeholder="Ask a question..."
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                disabled={state.loading}
              />
              <Button type="submit" size="sm" disabled={state.loading || !userInput}>Ask</Button>
            </form>
            <div className="mt-2 space-y-2">
              {state.chatHistory.map((msg, i) => (
                <div key={i} className={`rounded p-2 text-sm ${msg.role === 'user' ? 'bg-primary-50 text-primary-900' : 'bg-muted text-foreground'}`}>{msg.message}</div>
              ))}
            </div>
          </div>
          {/* Code Diff Suggestion (placeholder) */}
          {state.codeDiff && (
            <div className="bg-muted rounded p-2 text-sm text-foreground flex items-center gap-2">
              <FileDiff className="h-4 w-4 text-primary-500" />
              <pre className="whitespace-pre-wrap font-mono text-xs">{state.codeDiff}</pre>
            </div>
          )}
          {/* Loading/Error */}
          {state.loading && <div className="text-xs text-muted-foreground">Thinking...</div>}
          {state.error && <div className="text-xs text-red-600">{state.error}</div>}
        </div>
      </aside>
    </div>
  )
} 