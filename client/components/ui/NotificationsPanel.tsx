"use client"
import * as React from "react"
import { useState } from "react"
import { Bell, CheckCircle, BadgeCheck, BookOpen, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export type NotificationType = 'submission' | 'badge' | 'study' | 'ai'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
  link?: string
}

export interface NotificationsPanelProps {
  notifications: Notification[]
  loading?: boolean
  error?: string
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
}

const typeIcon = {
  submission: <CheckCircle className="h-5 w-5 text-success-500" />,
  badge: <BadgeCheck className="h-5 w-5 text-primary-500" />,
  study: <BookOpen className="h-5 w-5 text-warning-500" />,
  ai: <Sparkles className="h-5 w-5 text-info-500" />,
}

const typeLabel = {
  submission: 'Submission Results',
  badge: 'Badges',
  study: 'Study Plan',
  ai: 'AI Tutor',
}

export function NotificationsPanel({ notifications, loading, error, onMarkRead, onMarkAllRead }: NotificationsPanelProps) {
  const [open, setOpen] = useState(false)

  // Group notifications by type
  const grouped = React.useMemo(() => {
    const groups: { [K in NotificationType]: Notification[] } = { submission: [], badge: [], study: [], ai: [] }
    notifications.forEach(n => groups[n.type].push(n))
    return groups
  }, [notifications])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Notifications"
        onClick={() => setOpen(o => !o)}
      >
        <Bell className="h-6 w-6 text-foreground" />
        {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{unreadCount}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-96 max-w-full bg-card rounded-xl shadow-lg border z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold text-lg">Notifications</span>
            <Button size="sm" variant="ghost" onClick={onMarkAllRead} disabled={unreadCount === 0}>Mark all read</Button>
          </div>
          <div className="max-h-96 overflow-y-auto divide-y">
            {loading ? (
              <div className="p-4 flex items-center gap-2"><Loader2 className="animate-spin h-5 w-5" />Loading...</div>
            ) : error ? (
              <div className="p-4 text-red-600">{error}</div>
            ) : unreadCount === 0 && notifications.length === 0 ? (
              <div className="p-4 text-muted-foreground">No notifications.</div>
            ) : (
              Object.entries(grouped).map(([type, group]) => group.length > 0 && (
                <div key={type} className="p-2">
                  <div className="font-semibold text-xs text-muted-foreground mb-1 flex items-center gap-1">{typeIcon[type as NotificationType]} {typeLabel[type as NotificationType]}</div>
                  <ul className="space-y-2">
                    {group.map(n => (
                      <li key={n.id} className={`flex items-start gap-2 p-2 rounded ${!n.read ? 'bg-muted' : ''}`}> 
                        <span className="mt-1">{typeIcon[n.type]}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{n.title}</div>
                          <div className="text-xs text-muted-foreground">{n.message}</div>
                          <div className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                        </div>
                        {!n.read && <Button size="sm" variant="ghost" onClick={() => onMarkRead(n.id)}>Mark read</Button>}
                        {n.link && <a href={n.link} className="ml-2 text-primary-500 underline text-xs" tabIndex={0}>View</a>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
} 