import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string
  alt?: string
  fallback?: string
  className?: string
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, fallback, className, children, ...props }, ref) => (
    <span ref={ref} className={cn("inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted overflow-hidden", className)} {...props}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : fallback ? (
        <span className="text-xs text-muted-foreground">{fallback}</span>
      ) : (
        children
      )}
    </span>
  )
)
Avatar.displayName = "Avatar"

export function AvatarImage({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
  return src ? <img src={src} alt={alt} className={cn("w-full h-full object-cover", className)} /> : null
}

export function AvatarFallback({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-xs text-muted-foreground", className)}>{children}</span>
} 