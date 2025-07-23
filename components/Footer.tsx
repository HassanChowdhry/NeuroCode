'use client'
import { APP_NAME } from './APP_NAMEConfig'
export function Footer() {
  return (
    <footer className="py-8 bg-background border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</div>
        <nav className="flex gap-6 text-sm">
          <a href="/privacy" className="hover:text-foreground">Privacy</a>
          <a href="/terms" className="hover:text-foreground">Terms</a>
          {/* TODO: Add theme toggle here if desired */}
        </nav>
      </div>
    </footer>
  )
} 