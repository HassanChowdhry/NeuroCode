"use client"
import * as React from "react"
import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, CheckCircle, User } from 'lucide-react'

export interface ProfileStats {
  easy: number
  medium: number
  hard: number
  expert: number
}
export interface LanguageUsage {
  language: string
  percent: number
}
export interface TopicMastery {
  topic: string
  value: number // 0-100
}
export interface BadgeEarned {
  id: string
  label: string
  icon?: React.ReactNode
}
export interface ActivityItem {
  id: string
  type: string
  description: string
  date: string
}
export interface ProfilePageProps {
  avatarUrl: string
  displayName: string
  bio: string
  stats: ProfileStats
  languageUsage: LanguageUsage[]
  topicMastery: TopicMastery[]
  badges: BadgeEarned[]
  activity: ActivityItem[]
  isOwner: boolean
  loading?: boolean
  error?: string
  onEditProfile?: (data: { avatarUrl: string; displayName: string; bio: string }) => void
}

function PieChart({ data }: { data: LanguageUsage[] }) {
  // Placeholder SVG pie chart
  // TODO: Replace with real chart lib
  return <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground">Pie Chart</div>
}
function RadarChart({ data }: { data: TopicMastery[] }) {
  // Placeholder SVG radar chart
  // TODO: Replace with real chart lib
  return <div className="w-40 h-40 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground">Radar Chart</div>
}

export function ProfilePage({
  avatarUrl,
  displayName,
  bio,
  stats,
  languageUsage,
  topicMastery,
  badges,
  activity,
  isOwner,
  loading,
  error,
  onEditProfile
}: ProfilePageProps) {
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState(displayName)
  const [editBio, setEditBio] = useState(bio)
  const [editAvatar, setEditAvatar] = useState(avatarUrl)

  function handleSave() {
    onEditProfile?.({ avatarUrl: editAvatar, displayName: editName, bio: editBio })
    setEditMode(false)
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {loading ? (
        <div className="h-40 bg-muted animate-pulse rounded mb-6" />
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="bg-card rounded-xl p-6 shadow space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img src={editMode ? editAvatar : avatarUrl} alt="avatar" className="w-24 h-24 rounded-full object-cover border-2 border-primary-500" />
              {isOwner && editMode && (
                <input type="url" className="input-text mt-2 w-full" value={editAvatar} onChange={e => setEditAvatar(e.target.value)} placeholder="Avatar URL" />
              )}
            </div>
            <div className="flex-1">
              {editMode ? (
                <input className="input-text text-2xl font-bold mb-2 w-full" value={editName} onChange={e => setEditName(e.target.value)} />
              ) : (
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">{displayName} {isOwner && <Button size="sm" variant="ghost" onClick={() => setEditMode(true)} aria-label="Edit profile"><Pencil className="h-4 w-4" /></Button>}</h1>
              )}
              {editMode ? (
                <textarea className="input-text w-full mt-2" value={editBio} onChange={e => setEditBio(e.target.value)} placeholder="Bio" />
              ) : (
                <p className="text-muted-foreground mt-2">{bio}</p>
              )}
              {editMode && (
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={handleSave}><CheckCircle className="h-4 w-4 mr-1" />Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditMode(false)}>Cancel</Button>
                </div>
              )}
            </div>
          </div>
          {/* Stats & Charts */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-2">
              <div className="font-semibold mb-1">Problems Solved</div>
              <div className="flex gap-2">
                <Badge variant="success">Easy: {stats.easy}</Badge>
                <Badge variant="secondary">Medium: {stats.medium}</Badge>
                <Badge variant="outline">Hard: {stats.hard}</Badge>
                <Badge variant="ghost">Expert: {stats.expert}</Badge>
              </div>
              <div className="mt-4">
                <div className="font-semibold mb-1">Language Usage</div>
                <PieChart data={languageUsage} />
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-1">Topic Mastery</div>
              <RadarChart data={topicMastery} />
            </div>
          </div>
          {/* Badges */}
          <div>
            <div className="font-semibold mb-1">Badges</div>
            <div className="flex flex-wrap gap-2">
              {badges.length === 0 ? <span className="text-muted-foreground">No badges yet.</span> :
                badges.map(b => (
                  <span key={b.id} className="flex items-center gap-1 px-2 py-1 rounded bg-muted text-xs"><User className="h-3 w-3" />{b.label}</span>
                ))}
            </div>
          </div>
          {/* Activity Feed */}
          <div>
            <div className="font-semibold mb-1">Recent Activity</div>
            <ul className="space-y-2">
              {activity.length === 0 ? <li className="text-muted-foreground">No recent activity.</li> :
                activity.map(a => (
                  <li key={a.id} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{new Date(a.date).toLocaleString()}</span>
                    <span>{a.description}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
} 