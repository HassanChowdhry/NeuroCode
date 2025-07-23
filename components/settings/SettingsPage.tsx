"use client"
import * as React from "react"
import { useState } from "react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Loader2, Trash2 } from 'lucide-react'

export interface SettingsPageProps {
  user: {
    name: string
    avatarUrl: string
    email: string
    publicProfile: boolean
    defaultLang: string
    editorTheme: string
    fontSize: number
    notifications: { email: boolean; inApp: boolean }
  }
  onUpdate: (updates: Partial<SettingsPageProps["user"]>) => Promise<void>
  onDeleteAccount: () => Promise<void>
  loading?: boolean
  error?: string
  success?: string
}

const editorThemes = ["light", "dark", "system"]
const fontSizes = [12, 14, 16, 18, 20]
const languages = ["python", "cpp", "java", "javascript", "go"]

export function SettingsPage({ user, onUpdate, onDeleteAccount, loading, error, success }: SettingsPageProps) {
  const [tab, setTab] = useState<'profile' | 'preferences' | 'notifications' | 'privacy' | 'account'>('profile')
  const [form, setForm] = useState(user)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [localSuccess, setLocalSuccess] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setLocalError(null)
    setLocalSuccess(null)
    try {
      await onUpdate(form)
      setLocalSuccess("Settings updated!")
    } catch (e: any) {
      setLocalError(e.message || 'Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    setLocalError(null)
    try {
      await onDeleteAccount()
    } catch (e: any) {
      setLocalError(e.message || 'Failed to delete account')
    } finally {
      setDeleting(false)
    }
  }

  function handleChange<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Settings</h1>
      <div className="flex gap-2 border-b mb-6">
        <button className={`px-4 py-2 font-semibold ${tab === 'profile' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-muted-foreground'}`} onClick={() => setTab('profile')} tabIndex={0}>Profile</button>
        <button className={`px-4 py-2 font-semibold ${tab === 'preferences' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-muted-foreground'}`} onClick={() => setTab('preferences')} tabIndex={0}>Preferences</button>
        <button className={`px-4 py-2 font-semibold ${tab === 'notifications' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-muted-foreground'}`} onClick={() => setTab('notifications')} tabIndex={0}>Notifications</button>
        <button className={`px-4 py-2 font-semibold ${tab === 'privacy' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-muted-foreground'}`} onClick={() => setTab('privacy')} tabIndex={0}>Privacy</button>
        <button className={`px-4 py-2 font-semibold ${tab === 'account' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-muted-foreground'}`} onClick={() => setTab('account')} tabIndex={0}>Account</button>
      </div>
      {loading && <div className="h-8 w-32 bg-muted animate-pulse rounded mb-4" />}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {localError && <div className="text-red-600 mb-2">{localError}</div>}
      {(success || localSuccess) && <div className="text-success-500 mb-2">{success || localSuccess}</div>}
      {/* Profile Tab */}
      {tab === 'profile' && (
        <div className="space-y-4">
          <div>
            <label className="font-medium">Display Name</label>
            <Input value={form.name} onChange={e => handleChange('name', e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="font-medium">Avatar URL</label>
            <Input value={form.avatarUrl} onChange={e => handleChange('avatarUrl', e.target.value)} className="mt-1" />
            <img src={form.avatarUrl} alt="avatar" className="w-20 h-20 rounded-full mt-2 border" />
          </div>
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="animate-spin h-4 w-4" /> : 'Save'}</Button>
        </div>
      )}
      {/* Preferences Tab */}
      {tab === 'preferences' && (
        <div className="space-y-4">
          <div>
            <label className="font-medium">Default Language</label>
            <select value={form.defaultLang} onChange={e => handleChange('defaultLang', e.target.value)} className="input-text mt-1">
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="font-medium">Editor Theme</label>
            <select value={form.editorTheme} onChange={e => handleChange('editorTheme', e.target.value)} className="input-text mt-1">
              {editorThemes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="font-medium">Code Font Size</label>
            <select value={form.fontSize} onChange={e => handleChange('fontSize', Number(e.target.value))} className="input-text mt-1">
              {fontSizes.map(s => <option key={s} value={s}>{s}px</option>)}
            </select>
          </div>
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="animate-spin h-4 w-4" /> : 'Save'}</Button>
        </div>
      )}
      {/* Notifications Tab */}
      {tab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.notifications.email} onChange={e => handleChange('notifications', { ...form.notifications, email: e.target.checked })} id="notif-email" />
            <label htmlFor="notif-email" className="font-medium">Email Notifications</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.notifications.inApp} onChange={e => handleChange('notifications', { ...form.notifications, inApp: e.target.checked })} id="notif-inapp" />
            <label htmlFor="notif-inapp" className="font-medium">In-App Notifications</label>
          </div>
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="animate-spin h-4 w-4" /> : 'Save'}</Button>
        </div>
      )}
      {/* Privacy Tab */}
      {tab === 'privacy' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.publicProfile} onChange={e => handleChange('publicProfile', e.target.checked)} id="public-profile" />
            <label htmlFor="public-profile" className="font-medium">Public Profile</label>
            <Badge variant={form.publicProfile ? 'success' : 'outline'} className="ml-2">{form.publicProfile ? 'Public' : 'Private'}</Badge>
          </div>
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="animate-spin h-4 w-4" /> : 'Save'}</Button>
        </div>
      )}
      {/* Account Tab */}
      {tab === 'account' && (
        <div className="space-y-4">
          <div className="text-red-600 font-semibold">Danger Zone</div>
          <Button onClick={handleDelete} disabled={deleting} variant="outline"><Trash2 className="h-4 w-4 mr-1" />{deleting ? 'Deleting...' : 'Delete Account'}</Button>
        </div>
      )}
    </div>
  )
} 