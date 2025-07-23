'use client'
import { APP_NAME } from './APP_NAMEConfig'

export function Footer() {
  return (
    <footer className="w-full py-8 bg-muted/60 border-t border-border mt-12">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-2 text-center text-muted-foreground text-sm">
        <span>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</span>
      </div>
    </footer>
  )
} 